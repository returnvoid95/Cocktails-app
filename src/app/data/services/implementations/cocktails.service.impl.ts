import { Inject, Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CocktailsService } from "../abstractions/cocktails.service";
import { map, Observable, of, tap } from 'rxjs';
import { BASE_API_URL_TOKEN, Cocktail } from 'src/app/models';
import { CocktailApiResponse, convertCocktailDtoToEntity } from './cocktail-dto';

@Injectable({
  providedIn: 'root'
})
export class CocktailsServiceImpl implements CocktailsService {

  private readonly _coctailsCache: Record<string, Cocktail[]> = {};

  constructor(
    @Inject(BASE_API_URL_TOKEN) private readonly baseUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  getCocktailsByTitle(title: string | null): Observable<Cocktail[]> {
    if(!title || !title.length) {
      return of([]);
    }

    if(this._coctailsCache[title]) {
      return of(this._coctailsCache[title]);
    }

    return this.httpClient.get<CocktailApiResponse>(`${this.baseUrl}search.php?s=${title}`).pipe(
      map((response) => response.drinks.map((dto) => convertCocktailDtoToEntity(dto))),
      tap((cocktails) => this._coctailsCache[title] = cocktails)
    );
  }

  getRandomCocktail(): Observable<Cocktail> {
    return this.httpClient.get<CocktailApiResponse>(`${this.baseUrl}random.php`).pipe(
      map((response) => convertCocktailDtoToEntity(response.drinks[0]))
    )
  }

}
