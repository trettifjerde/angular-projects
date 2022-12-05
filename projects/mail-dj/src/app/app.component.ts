import { Component, OnInit } from '@angular/core';
import { FormInfo, Mailbox, Email, emailToReplyFormInfo } from './interfaces';
import { MailService } from './mail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'mail';
  username = '';

  mailbox = {name: '', entries: []} as Mailbox;
  formInfo = {sender : '' } as FormInfo;
  isFormBeingProcessed = false;
  email = {} as Email;
  errorMsg = '';
  spinnerTimer: any;
  loading = false;

  currentTab! : number;

  constructor(private mailService : MailService) {  }

  ngOnInit(): void {
    this.mailService.setUsername().subscribe(
      data => {
        this.username = data.username;
        this.openMailbox('inbox');
    })
  }

  openMailbox(name: string) : void {
    this.setSpinnerTimer();
    this.errorMsg = '';
    this.mailService.openMailbox(name).subscribe(mailbox => {
      this.currentTab = 1;
      this.mailbox = mailbox;
      this.clearSpinnerTimer();
    });
  }

  openCompose(reply=false) : void {
    this.errorMsg = '';
    this.currentTab = 2;
    if (reply)
      this.formInfo = emailToReplyFormInfo(this.username, this.email);
    else
      this.formInfo = {sender: this.username} as FormInfo;
  }

  openEmail(emailId: number) {
    this.setSpinnerTimer();
    this.errorMsg = '';
    this.mailService.openEmail(emailId).subscribe(email => {
      this.currentTab = 3;
      this.email = email;
      this.clearSpinnerTimer();
    });
  }

  sendEmail(info: FormInfo) {
    this.isFormBeingProcessed = true;
    this.setSpinnerTimer();
    this.errorMsg = '';
    this.mailService.sendEmail(info).subscribe(response => {
      if (typeof(response) === 'string') {
        this.errorMsg = response; 
        this.isFormBeingProcessed = false;
      } else {
        this.currentTab = 1;
        this.mailbox = response;
      }
      this.clearSpinnerTimer();
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

  onError(error: Error) {
    console.log(error);
    this.errorMsg = error.message;
  }

  setSpinnerTimer() {
    this.spinnerTimer = setTimeout(() => this.loading = true, 100);
  }

  clearSpinnerTimer() {
    clearTimeout(this.spinnerTimer);
    this.spinnerTimer = null;
    this.loading = false;
  }
}
