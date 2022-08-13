import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Email } from '../interfaces';
import { MailService } from '../mail.service';

@Component({
  selector: 'app-mailview',
  templateUrl: './mailview.component.html',
  styleUrls: ['./mailview.component.scss']
})
export class MailviewComponent {

  @Input() email = {} as Email;
  @Output() replyEvent = new EventEmitter();

  constructor(private mailService : MailService) { }
  
  onReply() {
    this.replyEvent.emit();
  }

}