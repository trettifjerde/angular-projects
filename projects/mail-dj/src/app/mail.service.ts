import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap, Observable, of } from 'rxjs';
import { Mailbox, Email, FormInfo, emailToEntries } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  emailsUrl = '/mailNg/emails/';

  constructor(private http: HttpClient) {}

  setUsername() : Observable<any> {
    return this.http.get(this.emailsUrl + 'username/')
      .pipe(
        catchError(this.handleError<any>('error getting username', {username:'user not found'}))
      );
  }

  openMailbox(name: string) : Observable<Mailbox> {
    return this.http.get<Email[]>(`${this.emailsUrl}${name}/`)
      .pipe(
        map(emails => {return {name: name, entries: emailToEntries(emails, name)} as Mailbox}),
        catchError(this.handleError<Mailbox>(`error opening '${name}'`, {name: name} as Mailbox))
      );
  }

  archiveEmail(emailId: number, archived: boolean) : Observable<Mailbox> {
    return this.http.put<Email[]>(this.emailsUrl + emailId + "/", {archived: archived})
      .pipe(
        map(emails => {return {name: 'inbox', entries: emailToEntries(emails, 'inbox')} as Mailbox}),
        catchError(this.handleError<Mailbox>('error (un)archiving email', {name: 'inbox'} as Mailbox))
      );
  }

  openEmail(emailId: number) : Observable<Email> {
    return this.http.get<Email>(this.emailsUrl + emailId + "/")
      .pipe(
        tap(email => {
          if (! email.read)
            this.http.put(this.emailsUrl + emailId + "/", {read: true}).subscribe()
        }),
        catchError(this.handleError<Email>('error opening email from db'))
      );
  }

  sendEmail(info: FormInfo) : Observable<Mailbox | string> {
    return this.http.post<Email[]>(this.emailsUrl, info)
      .pipe(
        map(emails => {return {name: 'sent', entries: emailToEntries(emails, 'sent')} as Mailbox}),
        catchError(err => of(err.error.error as string))
      );
  }

  deleteEmail(emailId: number)  {
    return this.http.post(this.emailsUrl + 'delete', {id: emailId})
      .pipe(
        map(_ => true),
        catchError(this.handleError<Boolean>('error deleting email', false))
      )
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
