import { animate, animateChild, keyframes, query, stagger, style, transition, trigger } from "@angular/animations";

export const recipeListAnimations = trigger(
    'listState', [
        transition('loading => loaded', [
            query('@itemState:enter', stagger(200, animateChild()))
        ])
    ]
)

export const recipeItemAnimations = trigger(
    'itemState', [
        transition(':enter', animate(300, keyframes([
            style({opacity: 0, transform: 'scale(0.8)', offset: 0 }),
            style({opacity: 0.5, transform: 'scale(0.9)', offset: 0.5}),
            style({opacity: 1, transform: 'scale(1)', offset: 1}),
        ]))),
        transition(':leave', animate(300, keyframes([
            style({opacity: 1, transform: 'scale(1)', offset: 0 }),
            style({opacity: 0.5, transform: 'scale(0.9)', offset: 0.5}),
            style({opacity: 0, transform: 'scale(0.8)', offset: 1}),
        ])))
    ]
)