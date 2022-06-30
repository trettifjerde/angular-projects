import { Component, OnInit } from '@angular/core';
import { link, LINKS } from '../app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  curPath = '';
  curLink?: link;
  links: link[] = [];

  constructor() { 
  }

  ngOnInit(): void {
    this.onLinkClicked('');
}

  onLinkClicked(path:string) {
    this.curPath = path;
    this.curLink = LINKS[this.curPath];
    this.links = [];
    for (let linkId of this.curLink.leads)
    {
      this.links.push(LINKS[linkId]);
    }
  }

  isAdvanced() : boolean {
    return this.curPath === 'advanced';
  }

}
