import { createAction, createReducer, props, on } from "@ngrx/store";

export type Toast = {message: string, isError: boolean} | null;

export interface GeneralState {
    toast: Toast
    isSubmitting: boolean
}

const initialState = {
    toast: null,
    isSubmitting: false
};

export const SET_SUBMITTING = 'SET_SUBMITTING';
export const SET_TOAST = 'SET_TOAST';

export const setSubmitting = createAction(SET_SUBMITTING, props<{status: boolean}>());
export const setToast = createAction(SET_TOAST, props<{toast: Toast}>());

export const generalReducer = createReducer(
    initialState,
    on(
        setSubmitting,
        (state, action) => ({...state, isSubmitting: action.status, toast: null})
    ),
    on(
        setToast,
        (state, action) => ({...state, toast: action.toast, isSubmitting: false})
    )

)



