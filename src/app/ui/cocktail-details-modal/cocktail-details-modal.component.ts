import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cocktail-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cocktail-details-modal.component.html',
  styleUrls: ['./cocktail-details-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailDetailsModalComponent {

}
