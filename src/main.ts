import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';

async function main() {
  await bootstrapApplication(AppComponent, {
    providers: []
  });
}

main();
