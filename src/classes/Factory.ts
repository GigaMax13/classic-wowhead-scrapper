export interface IFactoryConstructor<T> {
  new (args?: unknown): T
}

export class Factory {
  static create<T>(Type: IFactoryConstructor<T>, args?: unknown): T {
    return new Type(args)
  }
}
