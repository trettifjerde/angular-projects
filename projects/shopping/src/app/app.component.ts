import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService, private store: Store<AppState>) {}

  ngOnInit() {
    this.authService.autoLogin();
    this.store.dispatch(new RecipesInit());
  }
}
