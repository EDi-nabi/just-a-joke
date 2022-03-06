import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StorageModule } from '@ngx-pwa/local-storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { JokeInterceptor } from './interceptors/joke.interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { storageConfig } from './config/storage.config';
import { metaReducers } from './core/store/reducers/core.reducers';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    StorageModule.forRoot({
      IDBNoWrap: true,
      IDBDBName: storageConfig.IDBDBName, // custom database name when in `indexedDB`
      IDBStoreName: storageConfig.IDBStoreName, // `indexedDB` storeName name
      LSPrefix: storageConfig.LSPrefix, // prefix when in `localStorage` fallback
    }),
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    CoreModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JokeInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
