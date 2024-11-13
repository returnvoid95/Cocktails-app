import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CocktailDetailsModalComponent } from './cocktail-details-modal.component';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Cocktail } from 'src/app/models';
import { By } from '@angular/platform-browser';

describe('CocktailDetailsModalComponent', () => {
  let component: CocktailDetailsModalComponent;
  let fixture: ComponentFixture<CocktailDetailsModalComponent>;
  let mockDynamicDialogConfig: jasmine.SpyObj<DynamicDialogConfig>;

  beforeEach(async () => {
    mockDynamicDialogConfig = jasmine.createSpyObj('DynamicDialogConfig', ['data']);
    mockDynamicDialogConfig.data = {
      strDrinkThumb: 'image-url',
      strDrink: 'Margarita',
      strGlass: 'Cocktail glass',
      strInstructions: 'Shake well and serve',
      ingredients: ['Tequila', 'Lime juice', 'Salt']
    } as Cocktail;

    await TestBed.configureTestingModule({
      providers: [
        { provide: DynamicDialogConfig, useValue: mockDynamicDialogConfig }
      ],
      imports: [CocktailDetailsModalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CocktailDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cocktail image', () => {
    const imgElement = fixture.debugElement.query(By.css('img'));
    expect(imgElement).toBeTruthy();
    expect(imgElement.nativeElement.getAttribute('src')).toContain('image-url');
  });

  it('should display cocktail name', () => {
    const h2Element = fixture.debugElement.query(By.css('h2'));
    expect(h2Element).toBeTruthy();
    expect(h2Element.nativeElement.textContent).toContain('Margarita');
  });

  it('should display cocktail glass type', () => {
    const glassElement = fixture.debugElement.query(By.css('p:nth-child(3)'));
    expect(glassElement).toBeTruthy();
    expect(glassElement.nativeElement.textContent).toContain('Cocktail glass');
  });

  it('should display cocktail instructions', () => {
    const instructionsElement = fixture.debugElement.query(By.css('p:nth-child(4)'));
    expect(instructionsElement).toBeTruthy();
    expect(instructionsElement.nativeElement.textContent).toContain('Shake well and serve');
  });

  it('should display cocktail ingredients', () => {
    const ingredientElements = fixture.debugElement.queryAll(By.css('li'));
    expect(ingredientElements.length).toBe(3);
    expect(ingredientElements[0].nativeElement.textContent).toContain('Tequila');
    expect(ingredientElements[1].nativeElement.textContent).toContain('Lime juice');
    expect(ingredientElements[2].nativeElement.textContent).toContain('Salt');
  });
});
