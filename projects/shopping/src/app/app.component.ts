import { Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { AuthService } from './auth/auth.service';
import { Subscription, map} from 'rxjs';

import { RecipesInit } from './recipes/store/recipes.actions';
import { Toast } from './store/general.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Cookbook';
  toastSub: Subscription;
  submittingSub: Subscription;
  toastInfo: {toast: Toast, visible: boolean, timer: any} = {toast: null, visible: false, timer: null};
  submittingSpinner: {visible: boolean, timer: any} = {visible: false, timer: null};

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.toastSub = this.store.select(store => store.general.toast)
     .subscribe(toast => {
        clearTimeout(this.toastInfo.timer);

        if (toast) 
          this.toastInfo = {toast, visible: true, timer: setTimeout(() => this.toastInfo.visible = false, 5000)};
        
        else 
          this.toastInfo = {toast, visible: false, timer: null};
        
    });

    this.submittingSub = this.store.select(store => store.general.isSubmitting)
      .subscribe(isSubmitting => {

          if (isSubmitting && !this.submittingSpinner.timer) {
            this.submittingSpinner.timer = setTimeout(() => this.submittingSpinner.visible = true, 150);
          }
          
          else if (!isSubmitting && this.submittingSpinner.timer){
            clearTimeout(this.submittingSpinner.timer);
            this.submittingSpinner = {visible: false, timer: null};
          }
        });

    this.store.dispatch(new RecipesInit());
  }
}
