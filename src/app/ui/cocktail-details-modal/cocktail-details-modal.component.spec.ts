import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocktailDetailsModalComponent } from './cocktail-details-modal.component';

describe('CocktailDetailsModalComponent', () => {
  let component: CocktailDetailsModalComponent;
  let fixture: ComponentFixture<CocktailDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CocktailDetailsModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocktailDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
