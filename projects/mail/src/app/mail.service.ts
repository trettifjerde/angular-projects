import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { DbService } from './db.service';
import { Mailbox, Email, EmailEntry, FormInfo } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  userEmail = '';

  constructor( private dbService : DbService) {}

  setEmail(email: string) : void {
    this.userEmail = email;
  }

  openMailbox(name: string) : Observable<Mailbox> {
    const emails = this.dbService.getEmailEntries(name, this.userEmail)
    return of({name: name, emails: emails})
      .pipe(catchError(this.handleError<Mailbox>(`error opening '${name}'`, {name: name} as Mailbox)));
  }

  archiveEmail(emailId: number) : Observable<Mailbox> {
    return of(this.dbService.archiveEmail(emailId))
      .pipe(catchError(this.handleError<any>('error (un)archiving email')))
      .pipe(() => this.openMailbox('inbox'));
  }

  getEmail(emailId: number) : Observable<Email> {
    return of(this.dbService.getEmail(emailId))
      .pipe(catchError(this.handleError<Email>('error getting email from db')));
  }

  openEmail(emailId: number) : Observable<Email> {
    return of(this.dbService.openEmail(emailId))
      .pipe(catchError(this.handleError<Email>('error opening email from db')));
  }

  sendEmail(info: FormInfo) : Observable<any> {
    return of(this.dbService.saveEmail(info))
      .pipe(catchError(this.handleError<any>('error saving email into db')));
  }

  handleError<T>(message: string, fallback? : T)
  {
    return (error: any) : Observable<T> => {
      console.error(error);
      console.log(message);
      return of(fallback as T);
    }
  }
}
