import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    statuses = ['Stable', 'Broken', 'Finished'];
    projectForm = new FormGroup({
        'name': new FormControl(null, [Validators.required], [this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'status': new FormControl(0, Validators.required),
    });

    forbiddenNames(control: FormControl) : Promise<any> | Observable<any> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (control.value === 'test') {
                    resolve({'nameForbidden': true});
                } else {
                    return resolve({});
                }
            }, 2000);
        })
    }

    onSubmit() {
        console.log(this.projectForm);
    }

}
