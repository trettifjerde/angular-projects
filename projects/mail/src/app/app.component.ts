import { Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { FormInfo, Mailbox, Email, emailToReplyFormInfo } from './interfaces';
import { MailService } from './mail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mail';
  username = 'paddy@hg.me';

  mailbox= {} as Mailbox;
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

  openCompose(email?: Email) : void {
    this.currentTab = 2;

    if (email)
      this.formInfo = emailToReplyFormInfo(this.username, email);
    else 
      this.formInfo = {sender: this.username} as FormInfo;
  }

  openEmail(email: Email) {
    this.currentTab = 3;
    this.email = email;
  }

  reply(email: Email) {
    this.openCompose(email);
  }
}
