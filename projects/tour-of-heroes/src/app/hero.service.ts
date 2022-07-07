import { Injectable, OnInit, Output } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private httpOptions = {
    headers: new HttpHeaders({'ContentType': 'application/json'})
  };
  private heroesUrl = 'api/heroes';
  heroes = new Subject<Hero[]>();
  heroesCash: Hero[] = [];

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { 
      this.log('Heroes component initialized');
      this.updateHeroes();
    }

  updateHeroes(): void {
    this.getHeroes().subscribe(heroes => {
      this.heroesCash = heroes;
      this.heroes.next(heroes)
    });
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => {
          this.log(`fetched ${heroes.length} heroes`)
        }),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => {
        this.updateHeroes();
        this.log(`hero id=${hero.id} info updated`);
      }),
      catchError(this.handleError<any>('updateHero'))
    )
  }
  
  addHero(hero: Hero): void {
    this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero:Hero) => {
        this.log(`hero ${hero.name.toUpperCase()} with id=${newHero.id} is created`);
        this.updateHeroes();
      }),
      catchError(this.handleError<Hero>('addHero'))
    ).subscribe();
  }

  deleteHero(id: number): void {
    const url = `${this.heroesUrl}/${id}`;
    this.http.delete(url, this.httpOptions).pipe(
      tap(_ => {
        this.log(`deleted id=${id}`);
        this.updateHeroes();
      }),
      catchError(this.handleError<Hero>('deleteHero'))).subscribe();
  }

  searchHeroes(term: string) : Observable<Hero[]> {
    if (! term.trim())
      return of([]);
      
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`, this.httpOptions).pipe(
      tap(x => x.length ? 
          this.log(`found heroes matching "${term}"`) :
          this.log(`no heroes matching "${term}" found`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
