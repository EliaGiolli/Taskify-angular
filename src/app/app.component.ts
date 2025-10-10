import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { todos, Todo } from './tasks';

import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    TodoComponent, 
    TodoInputComponent,
    NavbarComponent, 
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private taskService: TasksService) {}

  onAddTodo(todo: Todo){
    this.taskService.addTodo(todo);
  }
}
