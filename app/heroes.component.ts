import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls: [ 'app/heroes.component.css' ],
})

export class HeroesComponent implements OnInit {
    public heroes : Hero[];
    title = 'Tour of Heroes';
    selectedHero: Hero;

    constructor(private heroService: HeroService, private router: Router) { }

    ngOnInit() {
        this.getHeroes();
    }

    onSelect(hero: Hero) { this.selectedHero = hero; }

    getHeroes() {
        this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
    }

    gotoDetail() {
        let link = [ '/hero', this.selectedHero.id ];
        this.router.navigate(link);
    }
};



