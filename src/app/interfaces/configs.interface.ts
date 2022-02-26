import { ApiConfig } from "./api-config.interface";
import { AppConfig } from "./app-config.interface";
import { StorageConfig } from './storage-config.interface';

export interface Configs {
  api: ApiConfig;
  app: AppConfig;
  storage: StorageConfig;
}
