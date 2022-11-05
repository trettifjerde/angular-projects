import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root-lecture',
  templateUrl: './app-lecture.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponentMeow implements OnInit, OnDestroy {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];
  valueChanges: Subscription;
  statusChanges: Subscription;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl('username', [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], [this.forbiddenEmails.bind(this)]),
        'gender': new FormControl(null, Validators.required)}),
      'hobbies': new FormArray([]),
    });

    this.valueChanges = this.signupForm.valueChanges.subscribe(
      (value) => console.log(value)
    );
    this.statusChanges = this.signupForm.statusChanges.subscribe(
      (status) => console.log('status ', status)
    );
    this.signupForm.setValue({
      'userData': {
        'email': 'meow@meow.me',
        'username': 'Meow McMeow',
        'gender': 'female'
      },
      'hobbies': []
    })
  }

  ngOnDestroy(): void {
    this.valueChanges.unsubscribe()
    this.statusChanges.unsubscribe();
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset({
      'userData': {
        'gender': 'female'
      }
    });
  }

  onAddHobby() {
    (<FormArray>this.signupForm.get('hobbies')).push(new FormControl(null, Validators.required));
  }

  getHobbies() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) > 0) {
      return {'nameForbidden': true}
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@ts.ts')
          resolve({'emailTaken': true});
        else 
          resolve(null);
      }, 1000);
    })
  }
}
