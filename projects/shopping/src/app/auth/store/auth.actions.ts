import { Action } from "@ngrx/store";
import { SignForm } from "../auth.service";
import { User } from "../user.model";

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const LOG_IN_START = 'LOG_IN_START';
export const AUTHENTICATION_FAIL = 'AUTHENTICATION_FAIL';
export const SIGN_UP_START = 'SIGN_UP_START';
export const SIGN_UP = 'SIGN_UP';
export const AUTO_LOG_IN = 'AUTO_LOG_IN';

export type AuthAction = LogInAction | LogOutAction | LogInStartAction | AuthenticationFailed | SignUpAction | SignUpStartAction | AutoLogIn;


export class LogInAction implements Action {
    readonly type = LOG_IN;
    constructor(public payload: User) {}
}

export class LogOutAction implements Action {
    readonly type = LOG_OUT;
    constructor() {}
}

export class LogInStartAction implements Action {
    readonly type = LOG_IN_START;
    constructor(public payload: SignForm) {}
}

export class AuthenticationFailed implements Action {
    readonly type = AUTHENTICATION_FAIL;
    constructor(public payload: string) {}
}

export class SignUpStartAction implements Action {
    readonly type = SIGN_UP_START;
    constructor(public payload: SignForm) {}
}

export class SignUpAction implements Action {
    readonly type = SIGN_UP;
    constructor(public payload: User) {}
}

export class AutoLogIn implements Action {
    readonly type = AUTO_LOG_IN;
    constructor(public payload: User) {}
}