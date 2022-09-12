import { Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { FormInfo, Mailbox, Email, emailToReplyFormInfo } from './interfaces';
import { MailService } from './mail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'mail';
  username = 'paddy@hg.me';

  mailbox = {} as Mailbox;
  formInfo = {sender : this.username } as FormInfo;
  email = {} as Email;

  currentTab! : number;

  constructor(private mailService : MailService) {
    this.mailService.setEmail(this.username);
    this.openMailbox('inbox');
  }

  openMailbox(name: string) : void {
    this.currentTab = 1;
    this.mailService.openMailbox(name).subscribe(mailbox => this.mailbox = mailbox);
  }

  openCompose(reply=false) : void {
    this.currentTab = 2;
    if (reply)
      this.formInfo = emailToReplyFormInfo(this.username, this.email);
    else 
      this.formInfo = {sender: this.username} as FormInfo;
  }

  openEmail(emailId: number) {
    this.currentTab = 3;
    this.mailService.openEmail(emailId).subscribe(email => this.email = email);
  }
}
