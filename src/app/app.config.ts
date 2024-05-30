import {ApplicationConfig, importProvidersFrom, isDevMode, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {provideClientHydration} from '@angular/platform-browser';
import {provideStore} from "@ngrx/store";
import {provideStoreDevtools} from "@ngrx/store-devtools";
import {provideEffects} from "@ngrx/effects";
import {appReducer, metaReducers} from "./store/app.reducers";
import {Effects} from "./store/app.effects";
import {provideHttpClient} from "@angular/common/http";
import {routes} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection(
    {eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    provideStore(appReducer,{metaReducers}),
    provideEffects(Effects),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: isDevMode() // Restrict extension to log-only mode (currently only DEV, then !isDevMode())
    }),
    importProvidersFrom([BrowserAnimationsModule]),

  ]
};
