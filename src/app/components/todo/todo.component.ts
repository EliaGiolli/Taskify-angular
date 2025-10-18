import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';

import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent {

  constructor(public taskService: TasksService) {}

  //Angular computes hasTasks only when the Signal todoList() changes
  hasTasks = computed(() => this.taskService.todoList().length > 0);

  deleteTodo(id:string){
    this.taskService.deleteTodo(id);
  }
}
