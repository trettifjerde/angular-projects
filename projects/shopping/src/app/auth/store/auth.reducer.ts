import { User } from '../user.model';
import * as authActions from './auth.actions';

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

export function authReducer(state=initialState, action: authActions.AuthAction) {
    switch(action.type) {
        case authActions.LOG_IN:
        case authActions.SIGN_UP:
        case authActions.AUTO_LOG_IN:
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        case authActions.LOG_OUT:
            return {
                ...state,
                user: null,
            }
        case authActions.LOG_IN_START:
        case authActions.SIGN_UP_START: 
            return {
                ...state,
                authError: '',
                loading: true
            }
        case authActions.AUTHENTICATION_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            }
        default:
            return state;
    }
}