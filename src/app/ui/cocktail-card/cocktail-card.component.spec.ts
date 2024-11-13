import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CocktailCardComponent } from './cocktail-card.component';
import { Cocktail } from 'src/app/models';
import { CardModule } from 'primeng/card';
import { NgOptimizedImage } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('CocktailCardComponent', () => {
  let component: CocktailCardComponent;
  let fixture: ComponentFixture<CocktailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardModule, NgOptimizedImage, CocktailCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailCardComponent);
    component = fixture.componentInstance;
    component.cocktail = {
      strDrink: 'Margarita',
      strGlass: 'Cocktail glass',
      strDrinkThumbPreview: 'image-url'
    } as Cocktail;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cocktail name and glass type', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.p-card-title').textContent).toContain('Margarita');
    expect(compiled.querySelector('.p-card-subtitle').textContent).toContain('Cocktail glass');
  });

  it('should display cocktail image if strDrinkThumbPreview is provided', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('img')).toBeTruthy();
    expect(compiled.querySelector('img').getAttribute('src')).toContain('image-url');
  });

  it('should not display cocktail image if strDrinkThumbPreview is not provided', () => {
    fixture.componentRef.setInput('cocktail', { strDrinkThumbPreview: null } as Cocktail);
    fixture.detectChanges();
    const imgElement = fixture.nativeElement.querySelector('img');
    expect(imgElement).toBeFalsy();
  });

  it('should emit cardClick event when clicked', () => {
    spyOn(component.cardClick, 'emit');
    const compiled = fixture.nativeElement;
    compiled.querySelector('main').click();
    expect(component.cardClick.emit).toHaveBeenCalled();
  });
});
