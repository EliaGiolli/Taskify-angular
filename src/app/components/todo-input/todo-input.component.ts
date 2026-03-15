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
