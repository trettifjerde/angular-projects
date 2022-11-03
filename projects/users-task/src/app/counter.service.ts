import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class CounterService {
    counter = 0;

    count() {
        this.counter++;
        console.log(`Counter incremented: ${this.counter}`);
    }
}