import { AppComponent } from './app/app.component';
import { bootstrapApplication, } from '@angular/platform-browser';
import { BASE_API_URL_TOKEN } from './app/models';
import { dataProviders } from './app/data';
import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

async function main() {
  await bootstrapApplication(AppComponent, {
    providers: [
      importProvidersFrom(HttpClientModule),
      provideAnimations(),
      { provide: BASE_API_URL_TOKEN, useValue: 'https://www.thecocktaildb.com/api/json/v1/1/' },
      ...dataProviders
    ]
  });
}

main();
