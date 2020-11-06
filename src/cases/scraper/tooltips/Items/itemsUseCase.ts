import { IScrapedEntityRepository } from '@repositories/IScrapedEntityRepository'
import { ITooltipItemDTO, TooltipItem } from '@entities/TooltipItem'
import { ScraperUseCase } from '@classes/ScraperUseCase'
import { ICacheProvider } from '@providers/ICacheProvider'

export class ItemsUseCase extends ScraperUseCase<TooltipItem, ITooltipItemDTO> {
  constructor(
    repository: IScrapedEntityRepository<TooltipItem>,
    cache: ICacheProvider
  ) {
    super({
      url: 'https://classic.wowhead.com/tooltip/item/',
      entityConstructor: TooltipItem,
      repository,
      cache
    })
  }
}
