import {animate, keyframes, state, style, transition, trigger} from "@angular/animations";

export const crossfade = trigger ('crossfade', [
  transition(':enter', animate("0.5s" , keyframes([
    style({opacity: 0}),
    style({opacity: 1})
    ]))),
  transition('*=>*', animate("1s" , keyframes([
    style({opacity: 1}),
    style({opacity: 0}),
    style({opacity: 1})
  ])))
])

