import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {

  powers = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
  submitted = false;
  model = {name: '', alterEgo: '', power: ''};

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.heroService.addHero(this.model as Hero);
    this.submitted = true;
  }

}
