import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') form: NgForm;
  defaultQuestion = 'pet';
  genders = ['male', 'female'];
  submitted = false;

  user = {
    username: '',
    email: '',
    question: '',
    answer: '',
    gender: ''
  };

  suggestUserName() {
    const suggestedName = 'Superuser';
  //   this.form.setValue({
  //     userData: {
  //       username: suggestedName,
  //       email: '',
  //       gender: 'male'
  //     },
  //     secret: 'pet',
  //     answer: ''
  //   })
      this.form.form.patchValue({userData: {username: suggestedName}});
  }


  onSubmit() {
    this.submitted = true;
    this.user.username = this.form.value.userData.username;
    this.user.email = this.form.value.userData.email;
    this.user.gender = this.form.value.userData.gender;
    this.user.question = this.form.value.secret;
    this.user.answer =  this.form.value.answer;

    this.form.reset();
  }
}
