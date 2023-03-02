import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Store } from "@ngrx/store";
import {filter, Subscription } from "rxjs";
import { AppState } from "../store/app.reducer";
import { setSpinnerTimer } from "../shared/utils";
import { NavigationEnd, Router, RouterEvent } from "@angular/router";

@Component({
    selector: 'app-recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit, OnDestroy {
    filterString = '';
    fetched: boolean;
    fetchedSub: Subscription;
    scrollSub: Subscription;
    navigationSub: Subscription;
    navigationSpinner: {visible: boolean, timer: any} = {visible: false, timer: null};
    @ViewChild('main') main: ElementRef;
    isMobileVisible = true;

    constructor(private store: Store<AppState>, private router: Router) {}

    ngOnInit(): void {
        this.fetchedSub = this.store.select(store => store.recipes.fetched).subscribe(
            fetched => {
                this.fetched = fetched;
            }
        )
        this.navigationSub = this.store.select(store => store.recipes.navigationInProgress).subscribe(
            navigationInProgress => {
                setSpinnerTimer(navigationInProgress, this.navigationSpinner);
            }
        )
    }

    ngAfterViewInit() {
        this.scrollSub = this.router.events.pipe(
            filter((e: RouterEvent) => e instanceof NavigationEnd))
        .subscribe(event => {
            this.isMobileVisible = (event.url === '/recipes');
            this.main.nativeElement.scrollTo({top: 0, behavior: 'smooth'})
        })
    }

    ngOnDestroy(): void {
        this.fetchedSub.unsubscribe();
        this.scrollSub.unsubscribe();
        this.navigationSub.unsubscribe();
    }

    clearFilter() {
        this.filterString = '';
    }

    toggleMobileRecipes() {
        this.isMobileVisible = !this.isMobileVisible;
    }
}