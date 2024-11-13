import { Provider } from "@angular/core";
import { CocktailsService } from "./services/abstractions/cocktails.service";
import { CocktailsServiceImpl } from "./services/implementations/cocktails.service.impl";

export const dataProviders: Provider[] = [
  { provide: CocktailsService, useClass: CocktailsServiceImpl }
]
