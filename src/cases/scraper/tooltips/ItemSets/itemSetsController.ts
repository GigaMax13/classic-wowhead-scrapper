import { ScraperController } from '@classes/ScraperController'
import { ICacheProvider } from '@providers/ICacheProvider'
import { IScraperUseCase } from '@classes/ScraperUseCase'

export class ItemSetsController extends ScraperController {
  constructor(
    private tooltipItemSetUseCase: IScraperUseCase,
    private cacheProvider: ICacheProvider
  ) {
    // known limit [1, 551] -> [0, max]
    super({
      useCase: tooltipItemSetUseCase,
      cache: cacheProvider,
      name: 'tooltip-item-set',
      max: 1000,
      min: 1
    })
  }
}
