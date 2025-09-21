import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-todo-input',
  imports: [FormsModule, ButtonComponent],
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.scss'
})
export class TodoInputComponent {
  @Output() todoAdded = new EventEmitter<string>();
  todoText: string = '';


  onButtonClick(){
    if(this.todoText.trim()){
      this.todoAdded.emit(this.todoText);
      this.todoText = '';
    }
  }
}
