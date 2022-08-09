import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { MailService } from '../mail.service';
import { Email, Mailbox } from '../interfaces';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss']
})
export class MailboxComponent {

  @Input() mailbox = {} as Mailbox;
  @Output() mailboxChange = new EventEmitter<Mailbox>();
  @Output() emailOpenEvent = new EventEmitter<Email>();
  errorMsg = '';
  
  constructor(private mailService : MailService) { }

  onArchive(emailId: number, event: Event) : void {
    event.stopPropagation();
    this.mailService.archiveEmail(emailId).subscribe(inbox => {
      this.mailbox = inbox;
      this.mailboxChange.emit(this.mailbox);
    });
  }

  onEntryClick(emailId: number) : void {
    this.mailService.openEmail(emailId).subscribe(email => {
      this.emailOpenEvent.emit(email);
    })
  }

}
