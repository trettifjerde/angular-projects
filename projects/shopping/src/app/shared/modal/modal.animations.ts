import { animate, animateChild, keyframes, query, style, transition, trigger, group } from "@angular/animations";

export const modal = trigger(
    'modal', [
        transition('void => *', group([
            query('@modalContent', animateChild()),
            query('@modalShadow', animateChild())
        ])),
        transition('* => void', group([
            query('@modalContent', animateChild()),
            query('@modalShadow', animateChild())
        ]))
    ]
)

export const modalContent = trigger(
    'modalContent', [
        transition('void => *', animate(300, keyframes([
            style({opacity: 0, transform: 'translateY(-100%)'}),
            style({opacity: 0.7, transform: 'translateY(10%)'}),
            style({opacity: 1, transform: 'translateY(0%)'})
        ]))),
        transition('* => void', animate(300, keyframes([
            style({opacity: 1, transform: 'translateY(0%)'}),
            style({opacity: 0.7, transform: 'translateY(10%)'}),
            style({opacity: 0, transform: 'translateY(-100%)'})
        ]))),
    ]
)

export const modalShadow = trigger(
    'modalShadow', [
        transition('void => *', animate(200, keyframes([
            style({opacity: 0}),
            style({opacity: 1})
        ]))),
        transition('* => void', animate(200, keyframes([
            style({opacity: 1}),
            style({opacity: 0})
        ]))),
    ]
)