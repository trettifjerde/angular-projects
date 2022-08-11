import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MailService } from '../mail.service';
import { Mailbox } from '../interfaces';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html'
})
export class MailboxComponent {

  @Input() mailbox = {} as Mailbox;
  @Output() mailboxChange = new EventEmitter<Mailbox>();
  @Output() emailOpenEvent = new EventEmitter<number>();
  errorMsg = '';
  
  constructor(private mailService : MailService) { }

  onArchive(emailId: number, archived: boolean, event: Event) : void {
    event.stopPropagation();
    this.mailService.archiveEmail(emailId, archived).subscribe(inbox => this.mailboxChange.emit(inbox));
  }

  onEntryClick(emailId: number) : void {
    this.emailOpenEvent.emit(emailId);
  }

}
