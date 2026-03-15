import { Directive } from '@angular/core';

@Directive({
  selector: '[appCard]',
  standalone: true,
  host: {
    class: 'card'
  }
})
export class CardDirective {}

