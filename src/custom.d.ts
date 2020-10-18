type Maybe<T> = T | null | undefined;

interface Dictionary<T> {
  [key: string | number]: T;
}
