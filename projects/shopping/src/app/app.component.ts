import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { AuthService } from './auth/auth.service';

import { RecipesInit } from './recipes/store/recipes.actions';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Cookbook';
  loading = false;
  loadingSpinnerTimer: any = null;
  //routerSub: Subscription;

  constructor(private authService: AuthService, private store: Store<AppState>) {}

  ngOnInit() {
    this.setLoadingSpinnerTimer();
    this.authService.autoLogin();
    this.store.dispatch(new RecipesInit());
  }

  setLoadingSpinnerTimer() {
    this.loadingSpinnerTimer = setTimeout(() => this.loading = true, 200);
  }

  clearLoadingSpinnerTimer() {
    clearTimeout(this.loadingSpinnerTimer);
    this.loadingSpinnerTimer = null;
    this.loading = false;
  }
}
