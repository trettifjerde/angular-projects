import { Component, OnInit, Input } from '@angular/core';
import { link, LINKS } from '../links';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() class = '';
  @Input() showMiniLogo = false;
  @Input() pathNames: string[] = [];
  links: link[] = [];

  constructor() {}

  ngOnInit(): void {
    for (let pathName of this.pathNames) {
      this.links.push(LINKS[pathName]);
    }
  }

}
