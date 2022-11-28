import { User } from '../user.model';
import * as authActions from './auth.actions';

export interface AuthState {
    user: User
};

const initialState: AuthState = {
    user: null
}

export function authReducer(state=initialState, action: authActions.AuthAction) {
    switch(action.type) {
        case authActions.LOG_IN:
            return {
                ...state,
                user: action.payload
            }
        case authActions.LOG_OUT:
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}