import { Component, OnInit } from '@angular/core';
import { link } from '../links';

@Component({
  selector: 'app-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent implements OnInit {
  currentLink: link = {} as link;

  constructor() { }

  ngOnInit(): void {
  }

  setLink(link: link) {
    this.currentLink = link;
  }

}
