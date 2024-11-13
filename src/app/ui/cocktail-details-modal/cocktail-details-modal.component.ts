import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogComponent, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Cocktail } from 'src/app/models';

@Component({
  selector: 'app-cocktail-details-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cocktail-details-modal.component.html',
  styleUrls: ['./cocktail-details-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CocktailDetailsModalComponent {

  constructor(private readonly dynamicDialogConfig: DynamicDialogConfig) {}

  readonly cocktail: Cocktail = this.dynamicDialogConfig.data;

}
