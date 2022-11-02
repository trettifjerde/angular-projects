import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'app-controller',
    templateUrl: './controller.component.html',
    styles: [``]
})
export class GameControllerComponent {
    @Output() onNewNumber = new EventEmitter<number>();
    currentN = 0;
    timer = 0;

    toggleTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        else
            this.timer = window.setInterval(this.playOdds.bind(this), 1000);
    }

    playOdds() {
        this.currentN++;
        this.onNewNumber.emit(this.currentN);
    }
}