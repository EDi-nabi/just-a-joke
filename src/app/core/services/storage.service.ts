import { Injectable, InjectionToken } from '@angular/core';
import { StorageMap, JSONSchema } from '@ngx-pwa/local-storage';
import { Observable, from, of } from 'rxjs';
import { filter, mergeMap, count, map } from 'rxjs/operators';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { ConfigService } from './config.service';
import { StorageConfig } from 'src/app/interfaces/storage-config.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly storageConfig: StorageConfig;
  private isBrowser: boolean;

  constructor(
    private storage: StorageMap,
    private configService: ConfigService,
    @Inject(PLATFORM_ID) private platformId: InjectionToken<Object>,
  ) {
    this.storageConfig = this.configService.getStorageConfig();
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  // read
  get<T>(dbName: string, key: string, schema: JSONSchema): Observable<T | undefined> {
    return this.isBrowser ? this.storage.get<T>(this.getPrefixedKey(dbName, key), schema) : of(undefined);
  }

  getMultiple<T>(dbName: string, keys: string[], schema: JSONSchema): Observable<T | undefined> {
    return this.isBrowser ? from(keys.map(key => ({ dbName, key, schema}))).pipe(
      mergeMap(item => this.get<T>(item.dbName, item.key, item.schema))
    ) : of(undefined);
  }

  getAll<T>(dbName: string, schema: JSONSchema): Observable<T | undefined> {
    return this.isBrowser ? this.keys(dbName).pipe(
      mergeMap(key => this.get<T>(dbName, key, schema))
    ) : of(undefined);
  }

  keys(dbName: string): Observable<string> {
    // you have to subscribe on "complete"
    return this.isBrowser ? this.storage.keys().pipe(
      filter(key => key.startsWith(this.storageConfig.prefixes[dbName])),
      map(key => key.replace(this.storageConfig.prefixes[dbName], ''))
    ) : of('');
  }

  // write
  set(dbName: string, key: string, value: any, schema?: JSONSchema): Observable<undefined> {
    return this.isBrowser ? this.storage.set(this.getPrefixedKey(dbName, key), value, schema || undefined) : of(undefined);
  }

  setMultiple(dbName: string, items: { key: string, value: any, schema?: JSONSchema }[], schema?: JSONSchema): Observable<undefined> {
    return this.isBrowser ? from(items.map(item => ({
      ...item,
      // you can add schema for each item, or set a global one
      schema: item.schema || schema || undefined,
      dbName,
    }))).pipe(
      mergeMap(item => this.set(item.dbName, item.key, item.value, item.schema))
    ) : of(undefined);
  }

  delete(dbName: string, key: string): Observable<undefined> {
    return this.isBrowser ? this.storage.delete(this.getPrefixedKey(dbName, key)) : of(undefined);
  }

  deleteMultiple(dbName: string, keys: string[]): Observable<undefined> {
    return this.isBrowser ? from(keys.map(key => ({ dbName, key }))).pipe(
      mergeMap(item => this.delete(item.dbName, item.key))
    ) : of(undefined);
  }

  clear(dbName?: string): Observable<undefined> {
    // uses StorageMap.keys() so you have to subscribe on "complete"
    if (this.isBrowser) {
      return dbName
      ? this.storage.keys().pipe(
          filter(key => key.startsWith(this.storageConfig.prefixes[dbName])),
          mergeMap(key => this.storage.delete(key))
        )
      : this.storage.clear();
    } else {
      return of(undefined);
    }
  }

  // info
  size(dbName?: string): Observable<number> {
    // returns number of items in storage, if !dbName it counts all "databases"
    if (this.isBrowser) {
      return dbName
      ? this.storage.keys().pipe(
        filter(key => key.startsWith(this.storageConfig.prefixes[dbName])),
        count()
      )
      : this.storage.size;
    } else {
      return of(0);
    }
  }

  has(dbName: string, key: string): Observable<boolean> {
    return this.isBrowser ? this.storage.has(this.getPrefixedKey(dbName, key)) : of(false);
  }

  isLocalStorageUsed(): boolean {
    return this.isBrowser ? this.storage.backingEngine === 'localStorage' : false;
  }

  // helpers
  getPrefixedKey(dbName: string, key: string): string {
    return this.storageConfig.prefixes[dbName] ? this.storageConfig.prefixes[dbName] + key : this.storageConfig.prefixes['main'] + key;
  }

}
