import { bootstrapApplication } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { App } from './app/app';
import { environment } from './environments/environment';
import { appConfig } from './app/app.config'; // Import de ta config avec routes

bootstrapApplication(App, {
  providers: [
    ...appConfig.providers,                     // Charge tes routes + HTTP + autres providers
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ]
}).catch(err => console.error(err));
