import { Component, EventEmitter, Output } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class ModalComponent {
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  onAnimationDone(event: AnimationEvent | any) {
    if (event.toState === 'void') {
      this.close.emit();
    }
  }

}
