import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { todos, Todo } from '../../tasks';

@Component({
  selector: 'app-todo',
  imports: [CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  todos: Todo[] = todos;
  hasTasks: boolean = todos.length > 0;
}
