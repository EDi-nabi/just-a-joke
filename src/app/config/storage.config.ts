
export const storageConfig = {
  // custom database name when in `indexedDB`
  IDBDBName: 'justajoke' + 'DB',
  // `indexedDB` storeName name
  IDBStoreName: 'data',
  // prefix when in `localStorage` fallback
  LSPrefix: 'justajoke' + 'db_',
  // prefixes to simulate multiple databases
  prefixes: {
    main: 'main_',
    ui: 'ui_',
  },
};
