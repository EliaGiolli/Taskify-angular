import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from './tasks.model';
import {FormsModule} from '@angular/forms'
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.scss'],
  imports: [FormsModule, ButtonComponent]
})
export class TodoInputComponent {
  @Output() todoAdded = new EventEmitter<Todo>();

  todoTitle: string = '';
  todoPriority: 'low' | 'medium' | 'high' = 'medium';
  todoCategory: string = '';
  todoDueDate: Date | null = null;
  todoTags: string = ''; 

  addTodo() {
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

    this.todoAdded.emit(newTodo);

    this.todoTitle = '';
    this.todoPriority = 'medium';
    this.todoCategory = '';
    this.todoDueDate = null;
    this.todoTags = '';
  }
}
