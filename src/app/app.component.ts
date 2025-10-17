import { Component } from '@angular/core';
import { TasksService } from './services/tasks.service';
import { Todo } from './components/todo-input/tasks.model';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    NavbarComponent, 
    TodoComponent, 
    TodoInputComponent, 
    FooterComponent
  ]
})
export class AppComponent {
  
  constructor(private tasksService: TasksService) {}
  
  get todos(){
   return this.tasksService.todoList;
  }
  
  onAddTodo(newTodo: Todo) {
    this.tasksService.addTodo(newTodo);
  }

  onDeleteTodo(id: string) {
    this.tasksService.deleteTodo(id);
  }
}
