declare global {
  type TDatabaseObject<T> = {
    [K in keyof T]: T[K] extends Date ? string : T[K];
  };
}

export {};
