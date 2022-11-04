import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class ActivateService {
    activatedEmitter = new Subject<boolean>();
}