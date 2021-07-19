export type ObjectType<T> = { [key: string]: T };

export type DeepPartial<T> = {
  [U in keyof T]?: T[U] extends object ? DeepPartial<T[U]> : T[U];
};
