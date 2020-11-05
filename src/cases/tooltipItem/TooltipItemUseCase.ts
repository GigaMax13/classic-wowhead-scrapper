import { axios } from '@config/axios'

import { ITooltipItemRepository } from '@repositories/ITooltipItemRepository'
import { CacheKey, ICacheProvider } from '@providers/ICacheProvider'
import { IItemDTO, TooltipItem } from '@entities/TooltipItem'

export class TooltipItemUseCase {
  constructor(
    private tooltipItemRepository: ITooltipItemRepository,
    private cacheProvider: ICacheProvider
  ) {}

  execute = (cacheName: string) => async (entity: number): Promise<void> => {
    if (!this.cacheProvider.has(`${CacheKey.isRunning}:${cacheName}`)) {
      return Promise.resolve()
    }

    const maskedEntity = String(entity).padStart(5, '0')
    const exists = await this.tooltipItemRepository.findByEntity(maskedEntity)

    this.cacheProvider.set(`${CacheKey.lastScraped}:${cacheName}`, maskedEntity)

    if (!exists) {
      try {
        const { status, data } = await axios.get<IItemDTO>(
          `https://classic.wowhead.com/tooltip/item/${maskedEntity}`
        )

        if (status === 200 && data) {
          this.cacheProvider.concat(
            `${CacheKey.newItemsFound}:${cacheName}`,
            maskedEntity,
            10
          )

          await this.tooltipItemRepository.save(
            new TooltipItem({
              entity: maskedEntity,
              ...data
            })
          )
        }
      } catch (e) {
        if (!e.response || e.response.status !== 404) {
          console.error(e)
        }
      }
    }
  }
}
