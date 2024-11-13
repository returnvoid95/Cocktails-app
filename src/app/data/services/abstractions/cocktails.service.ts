import { Observable } from "rxjs";
import { Cocktail } from "src/app/models";

export abstract class CocktailsService {

  abstract getCocktailsByTitle(title: string | null): Observable<Cocktail[]>;

  abstract getRandomCocktail(): Observable<Cocktail>;

}
