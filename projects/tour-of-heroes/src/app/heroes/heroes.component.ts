import { Component } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {

  heroes: Hero[] = [];

  constructor(public heroService: HeroService) {
    this.heroes = this.heroService.heroesCash;
    this.heroService.heroes.subscribe(heroes => this.heroes = heroes);
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero.id);
  }

}
