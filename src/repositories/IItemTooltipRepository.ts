import { ItemTooltip } from '../entities/itemTooltip'

export interface IItemTooltipRepository {
  findByEntity(entity: string): Promise<ItemTooltip | boolean>
  save(item: ItemTooltip): Promise<void>
}
