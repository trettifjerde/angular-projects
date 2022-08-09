import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { of } from 'rxjs';
import { Email } from '../interfaces';
import { MailService } from '../mail.service';

@Component({
  selector: 'app-mailview',
  templateUrl: './mailview.component.html',
  styleUrls: ['./mailview.component.scss']
})
export class MailviewComponent implements OnInit {

  @Input() email = {} as Email;
  @Output() replyEvent = new EventEmitter<Email>();

  constructor(private mailService : MailService) { }

  ngOnInit(): void {
  }
  
  onReply(emailId: number) {
    this.mailService.getEmail(emailId)
      .subscribe(email => this.replyEvent.emit(email));
  }

}
