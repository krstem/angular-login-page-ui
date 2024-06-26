import {importProvidersFrom, isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, provideHttpClient} from "@angular/common/http";
import {provideState, provideStore, StoreModule} from '@ngrx/store';
import {provideStoreDevtools, StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule, provideEffects} from '@ngrx/effects';
import {AuthEffects, Effects} from "./store/app.effects";
import {appReducer, metaReducers} from "./store/app.reducers";

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducer, {metaReducers}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: isDevMode()}),
    EffectsModule.forRoot(Effects),
  ],
  providers: [
    provideHttpClient(),
    AuthEffects,
    provideState("login", appReducer),
    provideStore(appReducer, {metaReducers}),
    provideEffects(Effects),
    provideStoreDevtools({maxAge: 25, logOnly: isDevMode()}),
  ],
  bootstrap: []
})
export class AppModule {
}
