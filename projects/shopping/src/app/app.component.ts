import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { ShoppingListService } from './services/shopping-list.service';
import { AppState } from './store/app.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Cookbook';
  authSubscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService, 
    private listService: ShoppingListService) {}

  ngOnInit() {
    this.authSubscription = this.store.select('auth').pipe(map(state => state.user)).subscribe(
      user => user ? this.listService.fetchIngredients() : this.listService.clearIngredients()
    );
    this.authService.autoLogin();
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
