import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { ShoppingListService } from './services/shopping-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Cookbook';
  userSubscription: Subscription;

  constructor(
    private authService: AuthService, 
    private listService: ShoppingListService) {}

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe(
      user => user ? this.listService.fetchIngredients() : this.listService.clearIngredients()
    );
    this.authService.autoLogin();
  }
}
