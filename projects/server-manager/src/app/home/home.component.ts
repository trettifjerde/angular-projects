import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { filter, interval, map, Observable, Subject, Subscription } from 'rxjs';
import { ActivateService } from '../activate.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubsctiption: Subscription;

  constructor(private router: Router, private activateService: ActivateService) { }

  ngOnInit() {
    //this.firstObsSubsctiption = interval(1000).subscribe(
    //  count => console.log(count)
    //)
    const customObservable = new Observable(observer => {
      let count = 0;
      setInterval(() => {

        if (count === 2) observer.complete();

        if (count > 3) {
          observer.error(new Error('Counter is greater that 3!'));
        }

        observer.next(count);
        count++;
      }, 1000)
    });

    this.firstObsSubsctiption = customObservable
      .pipe(
        filter(data => {return data > 0 }),
        map(data => {
          return 'Index: ' + data;
        })
      )
      .subscribe({
        next: d => console.log(d),
        error: e => console.log(e),
        complete: () => console.log('Completed!')
      });
  }

  ngOnDestroy(): void {
    this.firstObsSubsctiption.unsubscribe();
  }

  onLoadServers() {
    this.router.navigate(['/servers']);
  }

  onActivate() {
    this.activateService.activatedEmitter.next(true);
  }

}
