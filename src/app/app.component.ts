import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { TodoComponent } from './components/todo/todo.component';
import { TodoInputComponent } from './components/todo-input/todo-input.component';
import { todos, Todo } from './tasks';

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
  todos:Todo[] = todos;
  onTodoAdded(todoText: string){
    const newTodo: Todo = {
      id: Math.max(...this.todos.map(t => t.id)) + 1,
      title: todoText,
      description: '',
      completed: false,
      priority: 'medium',
      category: 'Personal',
      dueDate: null,
      createdAt: new Date(),
      tags: []
    };

    this.todos.push(newTodo);
  }
}
