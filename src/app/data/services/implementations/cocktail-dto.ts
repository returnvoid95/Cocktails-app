import { Cocktail } from "src/app/models";

export type CocktailDto = {
  idDrink: string | null;
  strDrink: string | null;
  strGlass: string | null;
  strInstructions: string | null;
  strDrinkThumb: string | null;
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;
}

export type CocktailApiResponse = {
  drinks: CocktailDto[] | null;
}

export function convertCocktailDtoToEntity(dto: CocktailDto): Cocktail {
  const ingredients: (string | null)[] = [];
  for (let i = 1; i <= 15; i++) {
    const key = `strIngredient${i}` as keyof CocktailDto;
    ingredients.push(dto[key]);
  }

  return {
    idDrink: dto.idDrink,
    strDrink: dto.strDrink,
    strGlass: dto.strGlass,
    strInstructions: dto.strInstructions,
    strDrinkThumb: dto.strDrinkThumb,
    strDrinkThumbPreview: dto.strDrinkThumb ? `${dto.strDrinkThumb}/preview` : null,
    ingredients: ingredients.filter((ingredient) => ingredient !== null) as string[]
  }
}
