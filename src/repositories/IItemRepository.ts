import { Item } from '../entities/item'

export interface IItemRepository {
  findByEntity(entity: number): Promise<Item | boolean>
  save(item: Item): Promise<void>
}
