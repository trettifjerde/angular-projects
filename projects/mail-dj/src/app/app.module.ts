import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DBInterseptorService } from './db.interceptor';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { MailformComponent } from './mailform/mailform.component';
import { MailviewComponent } from './mailview/mailview.component';
import { ParseEmailDirective } from './parse-email.directive';

@NgModule({
  declarations: [
    AppComponent,
    MailboxComponent,
    MailformComponent,
    MailviewComponent,
    ParseEmailDirective,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: DBInterseptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
