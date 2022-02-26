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
export class ConfigService {

  private config: Configs;

  constructor() {
    this.config = {
      api: apiConfig,
      app: appConfig,
      storage: storageConfig,
    };
  }

  get(config: string, key: string): any {
    switch (config) {
      case 'api':
        return this.config.api[key as keyof ApiConfig] || false;
      case 'app':
        return this.config.app[key as keyof AppConfig] || false;
      case 'storage':
        return this.config.storage[key as keyof StorageConfig] || false;
    }
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

