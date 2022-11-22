import { Component } from '@angular/core';
import { pollQuestions, pollResults } from './data';
import { PollResult, Question } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'character-test';
  maxAnswersLength = 5;

  inProgress = false;
  currentQuestion: Question = null;
  answers: number[] = [];
  result: PollResult = null;

  ngOnInit() {
    this.initTest();
  }

  initTest() {
    this.result = null;
    this.inProgress = false;
    this.answers = [];
    this.currentQuestion = pollQuestions[0];
  }

  startTest() {
    this.inProgress = true;
  }

  select(index: number) {
    this.answers.push(index);
    if (this.answers.length === this.maxAnswersLength) {
      let result = null;
      console.log(this.answers);
      for (let i = 0; i < this.answers.length; i++) {
        for (let j = i + 1; j < this.answers.length; j++) {
          if (this.answers[i] === this.answers[j]) {
            result = this.answers[i];
            break;
          }
        }
        if (result !== null) break;
      }
      this.result = pollResults[result];
    }
    else
      this.currentQuestion = pollQuestions[this.answers.length];
  }

  unselect() {
    this.answers.pop();
    this.currentQuestion = pollQuestions[this.answers.length];
  }

}
