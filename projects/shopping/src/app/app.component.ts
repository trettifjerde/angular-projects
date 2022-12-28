import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { AuthService } from './auth/auth.service';

import { RecipesInit } from './recipes/store/recipes.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Cookbook';
  //routerSub: Subscription;

  constructor(
    private authService: AuthService, 
    private store: Store<AppState>,
    @Inject(PLATFORM_ID) private platformId) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.authService.autoLogin();
    }
    this.store.dispatch(new RecipesInit());
  }
}
