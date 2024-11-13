import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cocktail } from 'src/app/models';
import { CocktailCardComponent } from '../cocktail-card/cocktail-card.component';

@Component({
  selector: 'app-search-result',
  standalone: true,
  imports: [
    CommonModule,
    CocktailCardComponent
  ],
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchResultComponent {

  readonly arrayOfSkeletons = new Array(10).fill(null);

  @Input() coctails: Cocktail[] | null | undefined;
  @Input() loading: boolean | null | undefined;

  trackByFn(index: number, item: Cocktail) {
    return item.idDrink;
  }

}
