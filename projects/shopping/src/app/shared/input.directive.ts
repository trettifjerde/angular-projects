import { AfterViewInit, Directive, EventEmitter, Host, HostListener, Input, Output } from "@angular/core";

@Directive({selector: '[ngModel][customInput]'})
export class CustomInputDirective implements AfterViewInit {
    @Input() pipes: string;
    @Output() ngModelChange = new EventEmitter<string>();
    pipesList: string[];
    timerId = null;

    constructor() {}

    ngAfterViewInit() {
        this.pipesList = this.pipes.split(' ');
    }

    @HostListener('input', ['$event.target.value']) onInput(data: string) {
        let newValue = data;

        this.pipesList.forEach(pipe => {
            switch(pipe) {
                case 'lower':
                    newValue = newValue.toLowerCase();
                    break;
                case 'lettersOnly':
                    newValue = newValue.replaceAll(/\d|\W/g, '');
                    break;
                default:
                    console.log('pipe not found: ', pipe)
            }
        })

        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }

        this.timerId = setTimeout(() => {
            this.ngModelChange.emit(newValue);
            this.timerId = null;
        }, 100);
    }
}