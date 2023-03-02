import { FormArray, FormControl, FormGroup, ValidationErrors } from "@angular/forms";

export function FormArrayEmpty(control: FormArray): ValidationErrors {
        return control.controls.length === 0 ? {arrayError: {empty: true}} : null;
}

export function ArrayContainsInvalidControl(control: FormArray) : ValidationErrors {
        let invalidControl = null;
        for (const c of control.controls){
                if (c.dirty && c.invalid){
                        invalidControl = c;
                        break;
                }
        }
        return invalidControl ? {arrayError: invalidControl.errors} : null;
}

export function ArrayContainsInvalidFormGroup(control: FormArray) : ValidationErrors {
        let invalidControll = null;
        for (const g of control.controls) {
                for (const c of Object.values((<FormGroup>g).controls)) {
                        if (c.invalid && c.dirty) {
                                invalidControll = c;
                                break;
                        }
                }
        }
        return invalidControll ? {arrayError: invalidControll.errors} : null;
}