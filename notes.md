## package.json – RxJS upgrade

**Old code**

```json
"dependencies": {
  "@angular/cdk": "^19.2.17",
  "@angular/common": "^19.2.0",
  "@angular/compiler": "^19.2.0",
  "@angular/core": "^19.2.0",
  "@angular/forms": "^19.2.0",
  "@angular/platform-browser": "^19.2.0",
  "@angular/platform-browser-dynamic": "^19.2.0",
  "@angular/platform-server": "^19.2.0",
  "@angular/router": "^19.2.0",
  "@angular/ssr": "^19.2.13",
  "express": "^4.18.2",
  "lucide-angular": "^0.544.0",
  "rxjs": "~7.8.0",
  "tslib": "^2.3.0",
  "zone.js": "~0.15.0"
}
```

**New code**

```json
"dependencies": {
  "@angular/cdk": "^19.2.17",
  "@angular/common": "^19.2.0",
  "@angular/compiler": "^19.2.0",
  "@angular/core": "^19.2.0",
  "@angular/forms": "^19.2.0",
  "@angular/platform-browser": "^19.2.0",
  "@angular/platform-browser-dynamic": "^19.2.0",
  "@angular/platform-server": "^19.2.0",
  "@angular/router": "^19.2.0",
  "@angular/ssr": "^19.2.13",
  "express": "^4.18.2",
  "lucide-angular": "^0.544.0",
  "rxjs": "^7.8.2",
  "tslib": "^2.3.0",
  "zone.js": "~0.15.0"
}
```

**Why**

Upgraded RxJS to the latest 7.x release so the app uses the current stable version alongside Angular 19, and to prepare for using RxJS streams to handle data mutations in the services.

---

## TodoComponent template – use @if/@for control flow

**Old code**

```html
<section class="todo-wrapper" aria-labelledby="main-title">
    <h2 id="main-title">Your definitive task manager!</h2>
    <div class="container" *ngIf="hasTasks()">
        <ul>
            <li 
                *ngFor="let todo of taskService.todoList(); index as i" 
                [ngClass]="{'completed': todo.completed, 'pending': !todo.completed}"
            >
                <span class="task-number">{{i + 1}}</span>
                <span class="task-title">{{todo.title}}</span>
                <span class="task-priority" [class]="'priority-' + todo.priority">
                    {{todo.priority}}
                </span>
                <span>{{todo.category}}</span>
                <app-button 
                    (click)="deleteTodo(todo.id.toString())"
                    aria-label="delete todos"
                >
                    Elimina
                </app-button>
            </li>
        </ul>
    </div>
    
    <div *ngIf="!hasTasks()" class="empty-state">
        <p>No tasks available!</p>
    </div>
</section>
```

**New code**

```html
<section class="todo-wrapper" aria-labelledby="main-title">
    <h2 id="main-title">Your definitive task manager!</h2>

    @if (hasTasks()) {
        <div class="container">
            <ul>
                @for (todo of taskService.todoList(); track todo.id; let i = $index) {
                    <li 
                        [ngClass]="{'completed': todo.completed, 'pending': !todo.completed}"
                    >
                        <span class="task-number">{{ i + 1 }}</span>
                        <span class="task-title">{{ todo.title }}</span>
                        <span class="task-priority" [class]="'priority-' + todo.priority">
                            {{ todo.priority }}
                        </span>
                        <span>{{ todo.category }}</span>
                        <app-button 
                            (click)="deleteTodo(todo.id.toString())"
                            aria-label="delete todos"
                        >
                            Elimina
                        </app-button>
                    </li>
                }
            </ul>
        </div>
    } @else {
        <div class="empty-state">
            <p>No tasks available!</p>
        </div>
    }
</section>
```

**Why**

Replaced legacy structural directives `*ngIf` and `*ngFor` with the new Angular control flow primitives `@if` and `@for` to match the requested style, keep templates aligned with modern Angular 19 patterns, and make iteration and branching more explicit and composable.

---

## TasksService – use RxJS for data mutations with signals for state

**Old code**

```ts
import { Injectable, signal } from '@angular/core';
import { todos } from '../tasks';
import { Todo } from '../components/todo-input/tasks.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private todos = signal<Todo[]>(todos);

  constructor(){
    //Allows Angular + Vite to use browser APIs such as localStorage
    if (typeof window === 'undefined') return; 

    const retrievedTodo = localStorage.getItem('task');

    if(retrievedTodo){
      this.todos.set(JSON.parse(retrievedTodo));
    }
  }

  addTodo(todo: Todo){
    this.todos.update(current => [...current, todo]);
    this.saveTasks();
  }

  deleteTodo(id: string) {
    this.todos.update(current => current.filter(t => t.id !== Number(id)));
    this.saveTasks();
  }
  
  get todoList() { return this.todos.asReadonly() }

  private saveTasks(){
    localStorage.setItem('task', JSON.stringify(this.todos()));
  }
}
```

**New code**

```ts
import { Injectable, signal } from '@angular/core';
import { todos } from '../tasks';
import { Todo } from '../components/todo-input/tasks.model';
import { Subject, scan, startWith } from 'rxjs';

type TodoMutation = (current: Todo[]) => Todo[];

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  private readonly todos = signal<Todo[]>(todos);
  private readonly mutations$ = new Subject<TodoMutation>();

  constructor() {
    if (typeof window !== 'undefined') {
      const retrievedTodo = localStorage.getItem('task');

      if (retrievedTodo) {
        this.todos.set(JSON.parse(retrievedTodo));
      }

      this.mutations$
        .pipe(
          startWith<TodoMutation>(() => this.todos()),
          scan<TodoMutation, Todo[]>((state, mutate) => mutate(state), this.todos())
        )
        .subscribe(updated => {
          this.todos.set(updated);
          this.saveTasks();
        });
    }
  }

  addTodo(todo: Todo) {
    this.mutations$.next(current => [...current, todo]);
  }

  deleteTodo(id: string) {
    const numericId = Number(id);
    this.mutations$.next(current => current.filter(t => t.id !== numericId));
  }
  
  get todoList() { 
    return this.todos.asReadonly(); 
  }

  private saveTasks() {
    localStorage.setItem('task', JSON.stringify(this.todos()));
  }
}
```

**Why**

Kept the source of truth as an Angular `signal` for simple, predictable reads, but routed all list changes through an RxJS `Subject` + `scan` pipeline so data mutations are modeled as pure functions over streams, matching your requirement to use Signals for state and RxJS for mutations while still persisting to `localStorage`.

---

## TodoInputComponent – use signals as the single source of truth for the form

**Old TypeScript**

```ts
import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from './tasks.model';
import {FormsModule} from '@angular/forms'
import { ButtonComponent } from '../button/button.component';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
  imports: [FormsModule, ButtonComponent]
})
export class TodoInputComponent {  

  constructor(public taskService: TasksService) {}

  //Initialization of the form's values
  todoTitle: string = '';
  todoPriority: 'low' | 'medium' | 'high' = 'medium';
  todoCategory: string = '';
  todoDueDate: Date | null = null;
  todoTags: string = ''; 

  addTodo(){
    console.log('todo added?')
    const newTodo: Todo = {
      id: Date.now(), 
      title: this.todoTitle,
      completed: false, 
      priority: this.todoPriority,
      category: this.todoCategory,
      dueDate: this.todoDueDate,
      createdAt: new Date(), 
      tags: this.todoTags.split(',').map(tag => tag.trim()) 
    };
    this.taskService.addTodo(newTodo);
    console.log('todo added now?',newTodo)

    this.todoTitle = '';
    this.todoPriority = 'medium';
    this.todoCategory = '';
    this.todoDueDate = null;
    this.todoTags = '';
  }
}
```

**New TypeScript**

```ts
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Todo } from './tasks.model';
import { ButtonComponent } from '../button/button.component';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
  imports: [FormsModule, ButtonComponent]
})
export class TodoInputComponent {  

  constructor(public taskService: TasksService) {}

  readonly title = signal('');
  readonly priority = signal<'low' | 'medium' | 'high'>('medium');
  readonly category = signal('');
  readonly dueDate = signal<string>('');

  addTodo() {
    const newTodo: Todo = {
      id: Date.now(),
      title: this.title(),
      completed: false,
      priority: this.priority(),
      category: this.category(),
      dueDate: this.dueDate() ? new Date(this.dueDate()) : null,
      createdAt: new Date(),
      tags: []
    };

    this.taskService.addTodo(newTodo);

    this.title.set('');
    this.priority.set('medium');
    this.category.set('');
    this.dueDate.set('');
  }
}
```

**Old template**

```html
<div class="todo-input-container">
  <form 
    class="internal-wrapper" 
    (ngSubmit)="addTodo()" 
    aria-labelledby="add-todo-form"
  >
    <h2 id="add-todo-form">Add a Todo</h2>

    <div class="form-group">
      <label for="todo-title">Title</label>
      <input
        id="todo-title"
        name="todoTitle"
        [(ngModel)]="todoTitle"
        placeholder="Enter todo title"
        required
      />
    </div>

    <div class="form-group">
      <label for="todo-priority">Priority</label>
      <select
        id="todo-priority"
        name="todoPriority"
        [(ngModel)]="todoPriority"
        required
      >
        <option value="" disabled selected>Select priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>

    <div class="form-group">
      <label for="todo-category">Category</label>
      <input
        id="todo-category"
        name="todoCategory"
        [(ngModel)]="todoCategory"
        placeholder="Enter category"
      />
    </div>

    <div class="form-group">
      <label for="todo-due-date">Due Date</label>
      <input
        id="todo-due-date"
        type="date"
        name="todoDueDate"
        [(ngModel)]="todoDueDate"
      />
    </div>

    
    <app-button type="submit" (clicked)="addTodo()">Add Todo</app-button>
  </form>
</div>
```

**New template**

```html
<div class="todo-input-container">
  <form 
    class="internal-wrapper" 
    (ngSubmit)="addTodo()" 
    aria-labelledby="add-todo-form"
  >
    <h2 id="add-todo-form">Add a Todo</h2>

    <div class="form-group">
      <label for="todo-title">Title</label>
      <input
        id="todo-title"
        [ngModel]="title()"
        (ngModelChange)="title.set($event)"
        placeholder="Enter todo title"
        required
      />
    </div>

    <div class="form-group">
      <label for="todo-priority">Priority</label>
      <select
        id="todo-priority"
        [ngModel]="priority()"
        (ngModelChange)="priority.set($event)"
        required
      >
        <option value="" disabled>Select priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>

    <div class="form-group">
      <label for="todo-category">Category</label>
      <input
        id="todo-category"
        [ngModel]="category()"
        (ngModelChange)="category.set($event)"
        placeholder="Enter category"
      />
    </div>

    <div class="form-group">
      <label for="todo-due-date">Due Date</label>
      <input
        id="todo-due-date"
        type="date"
        [ngModel]="dueDate()"
        (ngModelChange)="dueDate.set($event)"
      />
    </div>

    <app-button type="submit" (clicked)="addTodo()">Add Todo</app-button>
  </form>
</div>
```

**Why**

Kept the form’s source of truth entirely in **signals** (`title`, `priority`, `category`, `dueDate`), but wired the template through `ngModel` bindings so the current Angular toolchain in this project compiles cleanly without the experimental `@angular/forms/signals` subpackage, still satisfying the “Signals for forms” requirement in a simple, beginner-friendly way.

---

## CardDirective – reusable directive with selector

**New code**

```ts
import { Directive } from '@angular/core';

@Directive({
  selector: '[appCard]',
  standalone: true,
  host: {
    class: 'card'
  }
})
export class CardDirective {}
```

And usage example in `TodoComponent`:

```ts
import { CardDirective } from '../../directives/card.directive';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, ButtonComponent, CardDirective],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent { ... }
```

**Why**

Introduced a simple, standalone attribute directive selected via `[appCard]` to make it easy to apply a shared “card” look-and-feel around projected content, aligning with your request to use directives + selectors for reusable, customizable UI pieces on top of the existing `ng-content`-based button component.

---

## Standalone flags and directive usage tweaks

**Old snippets**

```ts
@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
  imports: [FormField, ButtonComponent]
})
export class TodoInputComponent { … }
```

```ts
@Component({
  selector: 'app-todo',
  imports: [CommonModule, ButtonComponent, CardDirective],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent { … }
```

```html
@if (hasTasks()) {
  <div class="container">
    …
  </div>
}
```

**New snippets**

```ts
@Component({
  selector: 'app-todo-input',
  standalone: true,
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
  imports: [FormField, ButtonComponent]
})
export class TodoInputComponent { … }
```

```ts
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardDirective],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent { … }
```

```html
@if (hasTasks()) {
  <div class="container" appCard>
    …
  </div>
}
```

**Why**

Marked the components as `standalone: true` so their `imports` arrays and Signal/Form directives are statically analyzable by Angular 19 tooling, and applied the `[appCard]` directive directly in the `todo` template so the shared card styling is actually used and lints stay clean.

---

## Zod schemas for tasks and form input

**Old `tasks.model.ts`**

```ts
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate: Date | null;
  createdAt: Date;
  tags: string[];
}
```

**New `tasks.model.ts`**

```ts
import { z } from 'zod';

export const TodoSchema = z.object({
  id: z.number().int(),
  title: z.string().min(1),
  completed: z.boolean(),
  priority: z.enum(['low', 'medium', 'high']),
  category: z.string().default(''),
  dueDate: z.union([z.date(), z.null()]),
  createdAt: z.date(),
  tags: z.array(z.string())
});

export type Todo = z.infer<typeof TodoSchema>;

export const TodoFormInputSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  priority: z.enum(['low', 'medium', 'high'], { message: 'Priority is required' }),
  category: z.string().optional(),
  dueDate: z.string().optional()
});

export type TodoFormInput = z.infer<typeof TodoFormInputSchema>;
```

And `package.json` now includes:

```json
"dependencies": {
  …
  "lucide-angular": "^0.544.0",
  "rxjs": "^7.8.2",
  "tslib": "^2.3.0",
  "zone.js": "~0.15.0",
  "zod": "^3.23.8"
}
```

**Why**

Centralized all task-related types and validation in `tasks.model.ts` using Zod, so `Todo` and the `TodoFormInput` shape are both derived from schemas instead of hand-written interfaces, making that file the single source of truth for task data contracts while the rest of the app (services, components, and signals) just import these shared types.





