import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Input() cocktails: Cocktail[] | null | undefined;
  @Input() loading: boolean | null | undefined;

  @Output() readonly cardClick = new EventEmitter<Cocktail>();

  onCardClick(cocktail: Cocktail) {
    this.cardClick.emit(cocktail);
  }

  trackByFn(index: number, item: Cocktail) {
    return item.idDrink;
  }

}
