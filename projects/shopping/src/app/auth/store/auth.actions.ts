import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';

export type AuthAction = LogInAction | LogOutAction;


export class LogInAction implements Action {
    readonly type = LOG_IN;
    constructor(public payload: User) {}
}

export class LogOutAction implements Action {
    readonly type = LOG_OUT;
    constructor() {}
}