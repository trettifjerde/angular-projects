import { createAction, props } from "@ngrx/store";
import { SignForm } from "../auth.service";
import { User } from "../user.model";

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const LOG_IN_START = 'LOG_IN_START';
export const AUTHENTICATION_FAIL = 'AUTHENTICATION_FAIL';
export const SIGN_UP_START = 'SIGN_UP_START';
export const SIGN_UP = 'SIGN_UP';
export const AUTO_LOG_IN = 'AUTO_LOG_IN';

export const logIn = createAction(LOG_IN, props<{user: User}>());
export const signUp = createAction(SIGN_UP, props<{user: User}>());
export const autoLogIn = createAction(AUTO_LOG_IN, props<{user: User}>());
export const logInStart = createAction(LOG_IN_START, props<{form: SignForm}>());
export const signUpStart = createAction(SIGN_UP_START, props<{form: SignForm}>());
export const authFailed = createAction(AUTHENTICATION_FAIL, props<{error: string}>());
export const logOut = createAction(LOG_OUT);