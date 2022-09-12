import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, map } from 'rxjs';
import { DbService } from './db.service';
import { Mailbox, Email, EmailEntry, FormInfo } from './interfaces';
import { MailboxComponent } from './mailbox/mailbox.component';

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
    return of(this.dbService.getEmailEntries(name, this.userEmail))
      .pipe(
        map(emails => {return {name: name, emails: emails} as Mailbox}),
        catchError(this.handleError<Mailbox>(`error opening '${name}'`, {name: name} as Mailbox))
      );
  }

  archiveEmail(emailId: number, archived: boolean) : Observable<Mailbox> {
    return of(this.dbService.archiveEmail(emailId, archived, this.userEmail))
      .pipe(
        map(emails => {return {name: 'inbox', emails: emails} as Mailbox}),
        catchError(this.handleError<any>('error (un)archiving email')));
  }

  openEmail(emailId: number) : Observable<Email> {
    return of(this.dbService.openEmail(emailId))
      .pipe(catchError(this.handleError<Email>('error opening email from db')));
  }

  sendEmail(info: FormInfo) : Observable<any> {
    return of(this.dbService.saveEmail(info))
      .pipe(catchError(this.handleError<any>('error saving email into db')));
  }

  deleteEmail(emailId: number) : Observable<Boolean> {
    return of(this.dbService.deleteEmail(emailId))
      .pipe(
        map(_ => true),
        catchError(this.handleError<Boolean>('error deleting email in db', false)));
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
