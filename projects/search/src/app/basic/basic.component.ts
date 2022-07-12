import { Component, Input, OnInit } from '@angular/core';
import { Observer } from 'rxjs';
import { link, LINKS } from '../links';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent {
  currentLink: link = {} as link;

  constructor() {   }

  setLink(link: link) {
    this.currentLink = link;
  }

  isImage(): boolean {
    return this.currentLink.href === 'images';
  }
}
