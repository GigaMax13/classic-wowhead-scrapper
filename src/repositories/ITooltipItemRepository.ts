import { TooltipItem } from '@entities/TooltipItem'

export interface ITooltipItemRepository {
  findByEntity(entity: string): Promise<TooltipItem | void>
  save(item: TooltipItem): Promise<void>
}
