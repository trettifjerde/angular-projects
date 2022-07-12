import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { AdvancedComponent } from './advanced/advanced.component';
import { BasicComponent } from './basic/basic.component';
import { link, LINKS } from './links';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  currentLink: link = {} as link;

  constructor(private router: Router) { }

  ngOnInit() {  }

  onActivate(component: BasicComponent | AdvancedComponent) {
    this.currentLink = LINKS[this.router.url.slice(1)];
    component.setLink(this.currentLink);
  }

}
