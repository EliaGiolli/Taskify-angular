import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from './tasks';
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
  todoDescription: string = '';
  todoPriority: 'low' | 'medium' | 'high' = 'medium';
  todoCategory: string = '';
  todoDueDate: Date | null = null;
  todoTags: string = ''; // Stringa separata da virgole per i tag

  addTodo() {
    const newTodo: Todo = {
      id: Date.now(), // Genera un ID unico basato sul timestamp
      title: this.todoTitle,
      description: this.todoDescription,
      completed: false, // Imposta il valore predefinito su `false`
      priority: this.todoPriority,
      category: this.todoCategory,
      dueDate: this.todoDueDate,
      createdAt: new Date(), // Imposta la data di creazione al momento corrente
      tags: this.todoTags.split(',').map(tag => tag.trim()) // Converte la stringa di tag in un array
    };

    this.todoAdded.emit(newTodo);

    // Resetta i campi del form dopo l'aggiunta
    this.todoTitle = '';
    this.todoDescription = '';
    this.todoPriority = 'medium';
    this.todoCategory = '';
    this.todoDueDate = null;
    this.todoTags = '';
  }
}
