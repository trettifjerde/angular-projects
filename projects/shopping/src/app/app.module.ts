import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRouterModule } from './app-router.module';
import { StoreModule} from '@ngrx/store';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { DBInterseptorService } from './services/db-interseptor.service';
import { appReducer } from './store/app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRouterModule,
    StoreModule.forRoot(appReducer)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: DBInterseptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
