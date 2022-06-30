import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { link, LINKS } from '../app.component';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  curPath: string;
  curLink: link;

  constructor(private router: Router) {
    this.curPath = this.router.url === '/' ? '' : this.router.url.slice(1);
    this.curLink = LINKS[this.curPath];
   }

  ngOnInit(): void {}

  isImage() : boolean {
    return this.curPath === 'image';
  }

}
