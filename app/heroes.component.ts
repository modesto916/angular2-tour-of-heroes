import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from './hero';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls: [ 'app/heroes.component.css' ],
    directives: [ HeroDetailComponent ]
})

export class HeroesComponent implements OnInit {
    public heroes : Hero[];
    title = 'Tour of Heroes';
    selectedHero: Hero;
    addingHero = false;
    error: any;

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

    addHero() {
        this.addingHero = true;
        this.selectedHero = null;
    }

    deleteHero(hero: Hero, event: Event) {
        event.stopPropagation();
        this.heroService
            .delete(hero)
            .then(res => {
                this.heroes = this.heroes.filter(h => h != hero);
                if (this.selectedHero === hero) { this.selectedHero = null }
            })
            .catch(error => this.error = error);
    }

    close(savedHero: Hero) {
        this.addingHero = false;
        if (savedHero) { this.getHeroes() }
    }
};



