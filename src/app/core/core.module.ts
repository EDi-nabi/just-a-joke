import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './store/reducers/core.reducers';
import { UiEffects } from './store/effects/ui.effects';
import { JokesEffects } from './store/effects/jokes.effects';
import { HydrationEffects } from './store/effects/hydration.effects';
import { ApiService } from './services/api.service';
import { ConfigService } from './services/config.service';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('core', reducers),
    EffectsModule.forFeature([JokesEffects, UiEffects, HydrationEffects]),
  ],
  exports: [

  ],
  providers: [
    ApiService,
    ConfigService,
    StorageService,
  ]

})
export class CoreModule { }
