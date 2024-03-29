import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { MailformComponent } from './mailform/mailform.component';
import { MailviewComponent } from './mailview/mailview.component';
import { ParseEmailBodyDirective } from './parse-email-body.directive';

@NgModule({
  declarations: [
    AppComponent,
    MailboxComponent,
    MailformComponent,
    MailviewComponent,
    ParseEmailBodyDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
