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
