import { animate, keyframes, style, transition, trigger } from "@angular/animations";

export const recipeStepAnimations = trigger(
    'stepState', [
        transition(':enter', animate(300, keyframes([
            style({opacity: 0, transform: 'translateY(-50%)'}),
            style({opacity: 0.7, transform: 'translateY(10%)'}),
            style({opacity: 1, transform: 'translateY(0%)'})
        ]))),
        transition(':leave', animate(150, keyframes([
            style({opacity: 1, transform: 'scale(1)'}),
            style({opacity: 0, transform: 'scale(0.9)'}),
        ])))
    ]
)