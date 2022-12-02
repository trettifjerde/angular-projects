import { createReducer, on } from "@ngrx/store"
import { User } from "../user.model"
import * as authActions from "./auth.actions.newer";

export interface AuthState {
    user: User,
    authError: string,
    loading: boolean
};

const initialState: AuthState = {
    user: null,
    authError: '',
    loading: false
}

export const authReducer = createReducer(
    initialState,
    on(
        authActions.logIn, authActions.signUp, authActions.autoLogIn, 
        (state, action) => ({...state, user: action.user, loading: false})
    ),
    on(
        authActions.logOut, 
        (state) => ({...state, user: null})
    ),
    on(
        authActions.logInStart, authActions.signUpStart, 
        (state) => ({...state, authError: '', loading: true})
    ),
    on(
        authActions.authFailed, 
        (state, action) => ({...state, user: null, authError: action.error, loading: false})
    )
);