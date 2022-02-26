import { Injectable } from '@angular/core';
import { StorageMap, JSONSchema } from '@ngx-pwa/local-storage';
import { Observable, from } from 'rxjs';
import { filter, mergeMap, count, map } from 'rxjs/operators';

import { ConfigService } from './config.service';
import { StorageConfig } from 'src/app/interfaces/storage-config.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly debug: boolean = false;
  private readonly storageConfig: StorageConfig;

  constructor(
    private storage: StorageMap,
    private configService: ConfigService,
  ) {
    this.storageConfig = this.configService.getStorageConfig();
  }

  // read
  get<T>(dbName: string, key: string, schema?: JSONSchema): Observable<T | undefined> {
    if (this.debug) console.log('# STORAGE get:', dbName, key);
    return this.storage.get<T>(this.getPrefixedKey(dbName, key), schema || { type: 'string' });
  }

  getMultiple<T>(dbName: string, keys: string[], schema?: JSONSchema): Observable<T | undefined> {
    return from(keys.map(key => ({ dbName, key, schema}))).pipe(
      mergeMap(item => this.get<T>(item.dbName, item.key, item.schema))
    );
  }

  getAll<T>(dbName: string, schema?: JSONSchema): Observable<T | undefined> {
    return this.keys(dbName).pipe(
      mergeMap(key => this.get<T>(dbName, key, schema))
    );
  }

  keys(dbName: string): Observable<string> {
    // you have to subscribe on "complete"
    return this.storage.keys().pipe(
      filter(key => key.startsWith(this.storageConfig.prefixes[dbName])),
      map(key => key.replace(this.storageConfig.prefixes[dbName], ''))
    );
  }

  // write
  set(dbName: string, key: string, value: any, schema?: JSONSchema): Observable<undefined> {
    if (this.debug) console.log('# STORAGE set:', dbName, key, value);
    return this.storage.set(this.getPrefixedKey(dbName, key), value, schema || undefined);
  }

  setMultiple(dbName: string, items: { key: string, value: any, schema?: JSONSchema }[], schema?: JSONSchema): Observable<undefined> {
    if (this.debug) console.log('# STORAGE setMultiple:', dbName, items);
    return from(items.map(item => ({
      ...item,
      // you can add schema for each item, or set a global one
      schema: item.schema || schema || undefined,
      dbName,
    }))).pipe(
      mergeMap(item => this.set(item.dbName, item.key, item.value, item.schema))
    );
  }

  delete(dbName: string, key: string): Observable<undefined> {
    if (this.debug) console.log('# STORAGE delete:', dbName, key);
    return this.storage.delete(this.getPrefixedKey(dbName, key));
  }

  deleteMultiple(dbName: string, keys: string[]): Observable<undefined> {
    if (this.debug) console.log('# STORAGE deleteMultiple:', dbName, keys);
    return from(keys.map(key => ({ dbName, key }))).pipe(
      mergeMap(item => this.delete(item.dbName, item.key))
    );
  }

  clear(dbName?: string): Observable<undefined> {
    // uses StorageMap.keys() so you have to subscribe on "complete"
    return dbName
    ? this.storage.keys().pipe(
        filter(key => key.startsWith(this.storageConfig.prefixes[dbName])),
        mergeMap(key => this.storage.delete(key))
      )
    : this.storage.clear();
  }

  // info
  size(dbName?: string): Observable<number> {
    // returns number of items in storage, if !dbName it counts all "databases"
    return dbName
    ? this.storage.keys().pipe(
      filter(key => key.startsWith(this.storageConfig.prefixes[dbName])),
      count()
    )
    : this.storage.size;
  }

  has(dbName: string, key: string): Observable<boolean> {
    return this.storage.has(this.getPrefixedKey(dbName, key));
  }

  isLocalStorageUsed(): boolean {
    return this.storage.backingEngine === 'localStorage';
  }

  // helpers
  getPrefixedKey(dbName: string, key: string): string {
    return (this.storageConfig.prefixes[dbName] || this.storageConfig.prefixes['main']) + key;
  }

}
