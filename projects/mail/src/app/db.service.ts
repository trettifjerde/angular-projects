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
  ];

  constructor() { }

  getEmailEntries(mailbox: string, userEmail: string): EmailEntry[] {
    let entries: EmailEntry[] = [];
    let dbCheckF : (email: Email) => boolean;
  
    switch(mailbox) {
      case 'inbox':
        dbCheckF = (email) => { return email.recipients.includes(userEmail) && ! email.archived};
        break;
      case 'sent':
        dbCheckF = (email) => { return email.sender === userEmail };
        break;
      case 'archived':
        dbCheckF = (email) => { return email.recipients.includes(userEmail) && email.archived};
        break;
      default:
        dbCheckF = (_) => false;
    }
    for (let email of this.DB) {
      if (dbCheckF(email))
        entries.push(email as EmailEntry);
    }
    return entries;
  }

  archiveEmail(emailId : number) {
    const i = this.DB.findIndex(email => email.id === emailId);
    this.DB[i].archived = !(this.DB[i].archived);
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

    console.log(this.DB);
  }
}
