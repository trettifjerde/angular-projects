import { Component } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { 
    this.heroes = this.heroService.heroesCash.slice(0, 4);
    this.heroService.heroes.subscribe(heroes => this.heroes = heroes.slice(0, 4));
  }

}
