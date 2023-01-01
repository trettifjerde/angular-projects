import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class DataService {
    getDetails() {
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                resolve('Data');
            }, 3000);
        })
    }
}