import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchComponent } from './ui/search/search.component';
import { SearchResultComponent } from './ui/search-result/search-result.component';
import { CocktailsService } from './data';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, debounceTime, firstValueFrom, Observable, of, switchMap } from 'rxjs';
import { Cocktail } from './models';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    SearchComponent,
    SearchResultComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  private readonly _foundCoctailsSubject = new BehaviorSubject<Cocktail[]>([]);
  private readonly _searchInProgressSubject = new BehaviorSubject<boolean>(false);

  constructor(private readonly cocktailsService: CocktailsService) {}

  readonly searchInputControl = new FormControl<string | null>(null);
  readonly foundCoctails$ = this._foundCoctailsSubject.asObservable();
  readonly searchInProgress$ = this._searchInProgressSubject.asObservable();

  async onSearch(title: string | null) {
    this._searchInProgressSubject.next(true);
    const foundCoctails = await firstValueFrom(this.cocktailsService.getCocktailsByTitle(title));
    this._foundCoctailsSubject.next(foundCoctails);
    this._searchInProgressSubject.next(false);
  }

  async getRandomCoctail() {
    const cocktail = await firstValueFrom(this.cocktailsService.getRandomCocktail());
  }

}
