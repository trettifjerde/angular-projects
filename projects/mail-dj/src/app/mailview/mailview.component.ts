import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Email } from '../interfaces';

@Component({
  selector: 'app-mailview',
  templateUrl: './mailview.component.html'
})
export class MailviewComponent {

  @Input() email = {} as Email;
  @Output() replyEvent = new EventEmitter();

  constructor() { }
  
  onReply() {
    this.replyEvent.emit();
  }

}
