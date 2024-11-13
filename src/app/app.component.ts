import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SearchComponent } from './ui/search/search.component';
import { SearchResultComponent } from './ui/search-result/search-result.component';
import { CocktailsService } from './data';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { Cocktail } from './models';
import { AsyncPipe } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { CocktailDetailsModalComponent } from './ui/cocktail-details-modal/cocktail-details-modal.component';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DialogService]
})
export class AppComponent {

  private readonly _foundCoctailsSubject = new BehaviorSubject<Cocktail[]>([]);
  private readonly _searchInProgressSubject = new BehaviorSubject<boolean>(false);
  private readonly _getRandomCocktailInProgressSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly cocktailsService: CocktailsService,
    private readonly dialogService: DialogService
  ) {}

  readonly searchInputControl = new FormControl<string | null>(null);
  readonly foundCoctails$ = this._foundCoctailsSubject.asObservable();
  readonly searchInProgress$ = this._searchInProgressSubject.asObservable();
  readonly getRandomCocktailInProgress$ = this._getRandomCocktailInProgressSubject.asObservable();

  async onSearch(title: string | null) {
    this._searchInProgressSubject.next(true);
    const foundCoctails = await firstValueFrom(this.cocktailsService.getCocktailsByTitle(title));
    this._foundCoctailsSubject.next(foundCoctails);
    this._searchInProgressSubject.next(false);
  }

  async getRandomCoctail() {
    this._getRandomCocktailInProgressSubject.next(true);
    const cocktail = await firstValueFrom(this.cocktailsService.getRandomCocktail());
    this._getRandomCocktailInProgressSubject.next(false);

    if(!cocktail) {
      return;
    }

    this.showCocktailModal(cocktail);
  }

  showCocktailModal(cocktail: Cocktail) {
    this.dialogService.open(CocktailDetailsModalComponent, {
      data: cocktail,
      styleClass: 'cocktail-details-dialog'
    });
  }

}
