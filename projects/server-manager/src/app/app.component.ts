import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivateService } from './activate.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loggedStatus = false;
  activated = false;
  activatedSub: Subscription;

  constructor(private authService: AuthService, private activateService: ActivateService) {}

  ngOnInit() {
    this.authService.statusUpdate.subscribe(
      (status) => this.loggedStatus = status
    );
    this.activatedSub = this.activateService.activatedEmitter.subscribe(
      data => this.activated = data
    );
  }

  ngOnDestroy(): void {
    this.activatedSub.unsubscribe();
  }

  log() {
    this.authService.loggedIn ? this.authService.logout() : this.authService.login();
  }
}
