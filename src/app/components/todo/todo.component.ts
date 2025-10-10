import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../tasks';
import { ButtonComponent } from '../button/button.component';

import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

  constructor(public taskService: TasksService) {}

  get todos() {
    return this.taskService.todoList();
  }

  get hasTasks(): boolean {
    return this.taskService.todoList().length > 0;
  }

  deleteTodo(id:string){
    this.taskService.deleteTodo(id);
  }
}
