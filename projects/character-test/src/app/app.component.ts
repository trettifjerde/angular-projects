import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component } from '@angular/core';
import { pollQuestions, pollResults } from './data';
import { PollResult, Question } from './interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('qState', [
      state('current', style({
        opacity: 1,
      })),
      state('previous', style({
        opacity: 0,
      })),
      state('next', style({
        opacity: 0,
      })),
      transition('current => next', animate(150, keyframes([
        style({
          opacity: 1,
          transform: 'translateX(0)'
        }),
        style({
          opacity: 0,
          transform: 'translateX(-600px)'
        })
      ]))),
      transition('next => current', animate(150, keyframes([
        style({
          opacity: 0,
          transform: 'translate(600px)'
        }),
        style({
          opacity: 1,
          transform: 'translate(0)'
        })
      ]))),
      transition('current => previous', animate(150, keyframes([
        style({
          opacity: 1,
          transform: 'translateX(0)'
        }),
        style({
          opacity: 0,
          transform: 'translateX(600px)'
        })
      ]))),
      transition('previous => current', animate(150, keyframes([
        style({
          opacity: 0,
          transform: 'translate(-600px)',
        }),
        style({
          opacity: 1,
          transform: 'translate(0)',
        })
      ]))),
    ])
  ]
})
export class AppComponent {
  title = 'character-test';
  questionsLength = 5;
  optionsLength = 4;

  currentI: number;
  nextI: number;
  questions: Question[];
  answers: number[];
  qState = null;
  result: PollResult;
  results: number[];
  loadingText: string;
  lastQuestionVisible = false;

  get currentQuestion(): Question {
    return this.questions[this.currentI];
  }

  ngOnInit() {
    this.initTest();
  }

  initTest() {
    this.questions = pollQuestions
      .map((v) => ({...v, sort: Math.random()}))
      .sort((a, b) => a.sort - b.sort)
      .map(q => {
        const indexedOptions = q.options
          .map((o, i) => ({option: {name: o, id: i}, sort: Math.random()}))
          .sort((a, b) => a.sort - b.sort)
          .map(o => o.option);
        return {question: q.question, options: indexedOptions}
      });
    this.answers = [];
    this.currentI = null;
    this.qState = 'current';
    this.result = pollResults[1];
    this.results = [];
    this.loadingText = '';
    this.lastQuestionVisible = false;
  }

  startTest() {
    this.currentI = 0;
  }

  unselect() {
    this.answers.pop();
    this.qState = 'previous';
  }

  select(index: number) {
    this.answers.push(index);
    this.qState = 'next';
  }

  onAnimationEnd(data: any) {
    if (data.fromState === 'current') {
      if (data.toState === 'next') {
        this.setNextQuestion(1);
      }
      else if (data.toState === 'previous') {
        this.setNextQuestion(-1);
      }
    }
  }

  setNextQuestion(modifier: number) {
    this.currentI += modifier;

    if (this.currentI === this.questionsLength) 
      this.calculateResult();
    else 
      this.qState = 'current';
  }

  calculateResult() {
    this.loadingText = 'Размышляем...';
    setTimeout(() => this.loadingText = '', 2000);

    console.log(this.answers);

    const scores = this.answers.reduce((acc, a) => {
        if (a in acc)
          acc[a] += 1;
        else
          acc[a] = 1;
        return acc
      }, {} as {[k: string]: number}
    );
    console.log(scores);

    let highest = 0;
    let results = [];
    Object.entries(scores).forEach(([id, count]) => {
      if (count > highest) {
        highest = count;
        results = [id];
      }
      else if (count === highest) {
        results.push(id)
      }
    })
    console.log(results);

    this.results = results.map(r => (+r));

    if (results.length === 1)
      this.result = pollResults[results[0]];
  }

  startLastQuestion() {
    this.lastQuestionVisible = true;
  }

  setFinalResult(id: number) {
    this.lastQuestionVisible = false;
    this.loadingText = 'Размышляем ещё раз...';
    setTimeout(() => this.loadingText = '', 1500);

    this.result = pollResults[id];
  }

}
