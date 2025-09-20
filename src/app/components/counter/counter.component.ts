import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-counter',
  imports: [FormsModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  countValue = 0;
  resetValue = 0;

  //methods
  increment() {
    this.countValue++;
  }

  decrement(){
    this.countValue--;
  }

  reset(){
    this.countValue = this.resetValue;
  }
}
