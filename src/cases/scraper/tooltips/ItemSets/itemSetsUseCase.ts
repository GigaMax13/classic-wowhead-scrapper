import { IScrapedEntityRepository } from '@repositories/IScrapedEntityRepository'
import { ITooltipItemSetDTO, TooltipItemSet } from '@entities/TooltipItemSet'
import { ScraperUseCase } from '@classes/ScraperUseCase'
import { ICacheProvider } from '@providers/ICacheProvider'

export class ItemSetsUseCase extends ScraperUseCase<
  TooltipItemSet,
  ITooltipItemSetDTO
> {
  constructor(
    repository: IScrapedEntityRepository<TooltipItemSet>,
    cache: ICacheProvider
  ) {
    super({
      url: 'https://classic.wowhead.com/tooltip/item-set/',
      entityConstructor: TooltipItemSet,
      repository,
      cache
    })
  }
}
