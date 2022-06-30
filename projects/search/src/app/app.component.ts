import { Component, OnInit } from '@angular/core';

export interface link {
  href: string,
  text: string,
  leads: string[]
}

export const LINKS: {[id:string]: link} = {
  '': {href: '', text: 'Google Search', leads: ['image', 'advanced']},
  'image': {href: 'image', text: 'Google Image', leads: ['', 'advanced']},
  'advanced': {href: 'advanced', text: 'Advanced Search', leads: ['']}
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit() : void {

  }

}
