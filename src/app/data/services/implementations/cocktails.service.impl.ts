import { Inject, Injectable, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CocktailsService } from "../abstractions/cocktails.service";
import { map, Observable, of, tap } from 'rxjs';
import { BASE_API_URL_TOKEN, Cocktail } from 'src/app/models';
import { CocktailApiResponse, CocktailDto, convertCocktailDtoToEntity } from './cocktail-dto';

@Injectable({
  providedIn: 'root'
})
export class CocktailsServiceImpl implements CocktailsService {

  private readonly _cocktailsCache: Record<string, Cocktail[]> = {};

  constructor(
    @Inject(BASE_API_URL_TOKEN) private readonly baseUrl: string,
    private readonly httpClient: HttpClient
  ) {}

  getCocktailsByTitle(title: string | null): Observable<Cocktail[]> {
    if(!title || !title.length) {
      return of([]);
    }

    if(this._cocktailsCache[title]) {
      return of(this._cocktailsCache[title]);
    }

    return this.httpClient.get<CocktailApiResponse>(`${this.baseUrl}search.php?s=${title}`).pipe(
      map((response) => response.drinks?.map((dto) => convertCocktailDtoToEntity(dto)) ?? []),
      tap((cocktails) => this._cocktailsCache[title] = cocktails)
    );
  }

  getRandomCocktail(): Observable<Cocktail | null> {
    return this.httpClient.get<CocktailApiResponse>(`${this.baseUrl}random.php`).pipe(
      map((response) => {
        if(response.drinks && response.drinks.length) {
          return convertCocktailDtoToEntity(response.drinks[0]);
        }
        return null;
      })
    )
  }

}
