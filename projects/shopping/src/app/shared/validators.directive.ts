import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
@Directive({
    selector: '[matchPasswords]',
    providers: [{provide: NG_VALIDATORS, useExisting: PasswordMatch, multi: true}]
})
export class PasswordMatch implements Validator {

    constructor() {}

    validate(control: AbstractControl<any, any>): ValidationErrors {
        const password = control.get('password');
        const confirmation = control.get('confirmation');

        return password && confirmation && password.value !== confirmation.value ? {
            passwordsMatch: 'mismatch'
        } : null;
    }

}