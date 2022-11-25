import { trigger, state, style, transition, animate, keyframes, query, stagger, sequence, animateChild, AnimationEvent } from '@angular/animations';
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
    ]),
    trigger('resultAnimation', [
      transition('* => in', [
          style({display: 'block'}),
          animate(5000, keyframes([
            style({opacity: 0, visibility: 'visible', transform: 'scale(0.5)', offset: 0}),
            style({opacity: 1, visibility: 'visible', transform: 'scale(1.3)', offset: 0.05}),
            style({opacity: 1, visibility: 'visible', transform: 'scale(1)', offset: 0.1}),
            style({opacity: 1, visibility: 'visible', transform: 'scale(0.9)', offset: 0.4}),
            style({opacity: 1, visibility: 'visible', transform: 'scale(1)', offset: 0.65}),
            style({opacity: 1, visibility: 'visible', transform: 'scale(0.9)', offset: 0.9}),
            style({opacity: 0, visibility: 'visible', transform: 'scale(0) translateY(-500px)', offset: 1}),
            ])),
        ])
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
  resultAnimationDone = false;

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
    this.result = null;
    this.results = null;
    this.loadingText = '';
    this.lastQuestionVisible = false;
    this.resultAnimationDone = false;
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

  onAnimationEnd(data: AnimationEvent) {
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

    const scores = this.answers.reduce((acc, a) => {
        if (a in acc)
          acc[a] += 1;
        else
          acc[a] = 1;
        return acc
      }, {} as {[k: string]: number}
    );

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

  onCatchPhraseDone(event: AnimationEvent) {
    if (event.toState === 'in')
      this.resultAnimationDone = true;
  }

}
