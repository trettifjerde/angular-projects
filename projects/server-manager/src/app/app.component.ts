import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedStatus = false;

  constructor(private authService: AuthService) {
    this.authService.statusUpdate.subscribe(
      (status) => this.loggedStatus = status
    );
  }
  log() {
    if(this.authService.loggedIn) {
      this.authService.logout();
    }
    else {
      this.authService.login();
    }
  }
}
