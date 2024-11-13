import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Cocktail } from 'src/app/models';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-cocktail-card',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    NgOptimizedImage
  ],
  templateUrl: './cocktail-card.component.html',
  styleUrls: ['./cocktail-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailCardComponent {

  @Input() cocktail: Cocktail | undefined;
  @Input() skeleton: boolean | undefined;

  @Output() readonly cardClick = new EventEmitter<void>();

}
