import { createReducer, on } from "@ngrx/store"
import { User } from "../user.model"
import * as authActions from "./auth.actions.newer";

export interface AuthState {
    user: User
};

const initialState: AuthState = {
    user: null
}

export const authReducer = createReducer(
    initialState,
    on(
        authActions.logIn, authActions.signUp, authActions.autoLogIn, 
        (state, action) => ({...state, user: action.user})
    ),
    on(
        authActions.logOut, 
        (state) => ({...state, user: null})
    ),
);