import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MailboxComponent } from './mailbox/mailbox.component';
import { MailformComponent } from './mailform/mailform.component';
import { MailviewComponent } from './mailview/mailview.component';

@NgModule({
  declarations: [
    AppComponent,
    MailboxComponent,
    MailformComponent,
    MailviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
