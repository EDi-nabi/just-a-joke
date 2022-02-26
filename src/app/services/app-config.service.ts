import { Injectable } from '@angular/core';

import { Configs } from 'src/app/interfaces/configs.interface';
import { ApiConfig } from 'src/app/interfaces/api-config.interface';
import { AppConfig } from 'src/app/interfaces/app-config.interface';
import { StorageConfig } from 'src/app/interfaces/storage-config.interface';

import { apiConfig } from 'src/app/config/api.config';
import { appConfig } from 'src/app/config/app.config';
import { storageConfig } from 'src/app/config/storage.config';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private config: Configs;

  constructor() {
    this.config = {
      api: apiConfig,
      app: appConfig,
      storage: storageConfig,
    };
  }

  get(key: string): any {
    return this.config.app[key] ?? false;
  }

  getAppConfig(): AppConfig {
    return this.config.app;
  }

  getApiConfig(): ApiConfig {
    return this.config.api;
  }

  getStorageConfig(): StorageConfig {
    return this.config.storage;
  }
}

