import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SuccessAlertComponent } from './alerts/success-alert.component';
import { WarningAlertComponent } from './alerts/warning-alert.component';

import { AppComponent } from './app.component';
import { BasicHighlightDirective } from './directives/basic-highlight.directive';
import { DetailsComponent } from './details/details.component';
import { GameControllerComponent } from './oddeven/controller.component';
import { EvenComponent } from './oddeven/even.component';
import { OddComponent } from './oddeven/odd.component';
import { OddEvenComponent } from './oddeven/oddeven.component';
import { ServerEditComponent } from './server-edit/server-edit.component';
import { ServerComponent } from './server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UnlessDirective } from './directives/unless.directive';

@NgModule({
  declarations: [
    AppComponent,
    ServerComponent,
    ServerEditComponent,
    ServersComponent,
    WarningAlertComponent,
    SuccessAlertComponent,
    DetailsComponent,
    OddEvenComponent,
    OddComponent,
    EvenComponent,
    GameControllerComponent,
    BasicHighlightDirective,
    UnlessDirective
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
