import { Component, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { MailService } from '../mail.service';
import { Mailbox } from '../interfaces';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html'
})
export class MailboxComponent {

  @Input() mailbox = {} as Mailbox;
  @Output() error = new EventEmitter<Error>();
  @Output() emailOpenEvent = new EventEmitter<number>();
  errorMsg = '';
  
  constructor(private mailService : MailService, private renderer: Renderer2) { }

  onArchive(emailId: number, archived: boolean, event: Event) : void {
    const btn = (<HTMLButtonElement>event.target);
    this.renderer.setProperty(btn, 'disabled', true);
    const entry = btn.closest('.entry');
    this.renderer.setStyle(entry, 'opacity', 0.5);
    event.stopPropagation();

    this.mailService.archiveEmail(emailId, archived).subscribe({
      next: _ => {
        this.renderer.setStyle(entry, 'display', 'none');
      },
      error: error => {
        this.error.emit(error);
        this.renderer.setProperty(btn, 'disabled', false);
      }
    });
  }

  onEntryClick(emailId: number) : void {
    this.emailOpenEvent.emit(emailId);
  }

}
