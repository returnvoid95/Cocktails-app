/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CocktailsServiceImpl } from './cocktails.service.impl';

describe('Service: Cocktails', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CocktailsServiceImpl]
    });
  });

  it('should ...', inject([CocktailsServiceImpl], (service: CocktailsServiceImpl) => {
    expect(service).toBeTruthy();
  }));
});
