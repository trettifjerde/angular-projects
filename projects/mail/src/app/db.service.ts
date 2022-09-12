import { Injectable } from '@angular/core';
import { Email, EmailEntry, FormInfo } from './interfaces'; 

@Injectable({
  providedIn: 'root'
})
export class DbService {

  DB : Email[] = [
    {
      id: 1,
      sender: 'paddy@hg.me',
      recipients: 'moony@hg.me',
      subject: 'hey!',
      body: 'sup????',
      timestamp: '08/08/77 06:30',
      read: true,
      archived: false
    },
    {
      id: 2,
      sender: 'moony@hg.me',
      recipients: 'paddy@hg.me',
      subject: 'good morning',
      body: 'hope ur doing fine',
      timestamp: '08/12/77 08:30',
      read: false,
      archived: false
    },
    {
      id: 3,
      sender: 'moony@hg.me',
      recipients: 'paddy@hg.me',
      subject: 'got a question for you',
      body: 'are you free tonight?',
      timestamp: '01/08/77 16:30',
      read: false,
      archived: false
    },
    {
      id: 4,
      sender: 'paddy@hg.me',
      recipients: 'moony@hg.me',
      subject: '<3333',
      body: 'for you - always',
      timestamp: '08/12/77 10:30',
      read: true,
      archived: false
    },
    {      
      id: 5,
      sender: 'paddy@hg.me',
      recipients: 'moony@hg.me, prongs@hg.me',
      subject: 'hey guys',
      body: 'hey ho',
      timestamp: '08/08/77 06:30',
      read: true,
      archived: false
    }
  ];

  constructor() { }

  getEmailEntries(mailbox: string, userEmail: string): EmailEntry[] {
    let entries: EmailEntry[] = [];
    let checkF : (email: Email) => boolean;
    let formatF : (email: Email) => EmailEntry;
  
    switch(mailbox) {
      case 'inbox':
        checkF = (email) => { return email.recipients.includes(userEmail) && ! email.archived};
        formatF = (email) => { return {
          id: email.id,
          user: email.sender,
          extra: 0,
          subject: email.subject,
          timestamp: email.timestamp,
          read: email.read
        }}
        break;
      case 'sent':
        checkF = (email) => { return email.sender === userEmail };
        formatF = (email) => { return {
          id: email.id,
          user: email.recipients.split(',')[0],
          extra: email.recipients.split(',').length - 1,
          subject: email.subject,
          timestamp: email.timestamp,
          read: email.read
        }}
        break;
      case 'archived':
        checkF = (email) => { return email.recipients.includes(userEmail) && email.archived};
        formatF = (email) => { return {
          id: email.id,
          user: email.sender,
          extra: 0,
          subject: email.subject,
          timestamp: email.timestamp,
          read: email.read
        }}
        break;
      default:
        checkF = (_) => false;
        formatF = (_) => { return {} as EmailEntry};
    }

    for (let email of this.DB) {
      if (checkF(email))
        entries.push(formatF(email));
    }

    console.log(entries);


    return entries;
  }

  archiveEmail(emailId : number, archived: boolean, userEmail: string) : EmailEntry[] {
    const i = this.DB.findIndex(email => email.id === emailId);
    this.DB[i].archived = archived;

    return this.getEmailEntries('inbox', userEmail);
  }

  markAsRead(emailIndex: number) {
    this.DB[emailIndex].read = true;
  }

  getEmail(emailId: number, markRead = false) : Email {
      const i = this.DB.findIndex(email => email.id === emailId);
      if (markRead)
        this.markAsRead(i);
      return this.DB[i];
  }

  openEmail(emailId: number) : Email {
    return this.getEmail(emailId, true);
  }

  saveEmail(info: FormInfo) {
    this.DB.push({
      id: this.DB.length + 1 ,
      sender: info.sender,
      recipients: info.recipients,
      subject: info.subject,
      body: info.body,
      timestamp: new Date().toDateString(),
      read: true,
      archived: false
    });
  }

  deleteEmail(emailId: number) {
      const emailIndex = this.DB.findIndex(email => email.id === emailId);
      this.DB.splice(emailIndex, 1);
  }
}
