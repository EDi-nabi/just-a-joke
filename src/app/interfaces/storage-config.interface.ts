export interface StorageConfig {
  IDBDBName: string;
  IDBStoreName: string;
  LSPrefix: string;
  prefixes: {
    [key: string]: string;
  };
}
