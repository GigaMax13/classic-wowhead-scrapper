export interface IScrapedEntityRepository<T> {
  findByEntity(entity: number): Promise<T | void>
  save(item: T): Promise<void>
}
