import { Component, OnInit } from '@angular/core';
import { FormInfo, Mailbox, EmailEntry, Email, emailToReplyFormInfo } from './interfaces';
import { MailService } from './mail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'mail';
  username = 'paddy@hg.me';

  mailbox = {name: '', entries: []} as Mailbox;
  formInfo = {sender : this.username } as FormInfo;
  email = {} as Email;
  errorMsg = '';

  btns! : NodeListOf<HTMLButtonElement>;
  currentTab! : number;

  constructor(private mailService : MailService) {
    this.mailService.setUsername().subscribe(
      data => {
        this.username = data.username;
        this.openMailbox('inbox');
    })
  }

  ngOnInit(): void {
    this.btns = document.querySelectorAll('#menuBtns button') as NodeListOf<HTMLButtonElement>;
  }

  toggleMenuBtns() : void {
    this.btns.forEach(btn => btn.disabled = ! btn.disabled);
  }

  openMailbox(name: string) : void {
    this.toggleMenuBtns();
    this.errorMsg = '';
    this.currentTab = 1;
    this.mailService.openMailbox(name).subscribe(mailbox => {
      this.mailbox = mailbox;
      this.toggleMenuBtns();
    });
  }

  openCompose(reply=false) : void {
    this.errorMsg = '';
    this.currentTab = 2;

    if (reply)
      this.formInfo = emailToReplyFormInfo(this.username, this.email);
  }

  openEmail(emailId: number) {
    this.toggleMenuBtns();
    this.errorMsg = '';
    this.currentTab = 3;
    this.mailService.openEmail(emailId).subscribe(email => {
      this.email = email;
      this.toggleMenuBtns();
    });
  }

  sendEmail(info: FormInfo) {
    this.toggleMenuBtns();
    this.errorMsg = '';
    this.mailService.sendEmail(info).subscribe(response => {
      if (typeof(response) === 'string') {
        this.errorMsg = response; 
      } else {
        this.currentTab = 1;
        this.mailbox = response;
      }
      this.toggleMenuBtns();
    });
  }

  deleteEmail(emailId: number) {
    this.mailService.deleteEmail(emailId).subscribe(
      result => {
        if (result)
          this.openMailbox(this.mailbox.name);
        else 
          this.errorMsg = 'Error deleting email';
      }
    );
  }
}
