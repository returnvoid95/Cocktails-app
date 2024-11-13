import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CocktailsServiceImpl } from './cocktails.service.impl';
import { BASE_API_URL_TOKEN, Cocktail } from 'src/app/models';
import { CocktailApiResponse, CocktailDto, convertCocktailDtoToEntity } from './cocktail-dto';

describe('CocktailsServiceImpl', () => {
  let service: CocktailsServiceImpl;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://example.com/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CocktailsServiceImpl,
        { provide: BASE_API_URL_TOKEN, useValue: baseUrl }
      ]
    });
    service = TestBed.inject(CocktailsServiceImpl);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an empty array if title is null or empty', () => {
    service.getCocktailsByTitle(null).subscribe(cocktails => {
      expect(cocktails.length).toBe(0);
    });
    service.getCocktailsByTitle('').subscribe(cocktails => {
      expect(cocktails.length).toBe(0);
    });
  });

  it('should fetch cocktails from API if not cached', () => {
    const title = 'margarita';
    const mockResponse: CocktailApiResponse = {
      drinks: [
        { idDrink: '1', strDrink: 'Margarita', strDrinkThumb: 'image-url' } as CocktailDto
      ]
    };
    service.getCocktailsByTitle(title).subscribe(cocktails => {
      expect(cocktails.length).toBe(1);
      expect(cocktails[0]).toEqual(convertCocktailDtoToEntity(mockResponse.drinks![0]));
    });
    const req = httpMock.expectOne(`${baseUrl}search.php?s=${title}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch a random cocktail from API', () => {
    const mockResponse: CocktailApiResponse = {
      drinks: [
        { idDrink: '1', strDrink: 'Margarita', strDrinkThumb: 'image-url' } as CocktailDto
      ]
    };
    service.getRandomCocktail().subscribe(cocktail => {
      expect(cocktail).toEqual(convertCocktailDtoToEntity(mockResponse.drinks![0]));
    });
    const req = httpMock.expectOne(`${baseUrl}random.php`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should return null if random cocktail API response is empty', () => {
    const mockResponse: CocktailApiResponse = {
      drinks: []
    };
    service.getRandomCocktail().subscribe(cocktail => {
      expect(cocktail).toBeNull();
    });
    const req = httpMock.expectOne(`${baseUrl}random.php`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
