import { Component, Output, EventEmitter } from '@angular/core';

import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  constructor(private taskService: TasksService) {}

  @Output() clicked = new EventEmitter<void>();

  deleteTodo(id:string){
    this.taskService.deleteTodo(id);
  }

}
