import { ScraperController } from '@classes/ScraperController'
import { ICacheProvider } from '@providers/ICacheProvider'
import { IScraperUseCase } from '@classes/ScraperUseCase'

export class ItemsController extends ScraperController {
  constructor(
    private tooltipItemUseCase: IScraperUseCase,
    private cacheProvider: ICacheProvider
  ) {
    // known limit [35, 23075] -> [0, max]
    super({
      useCase: tooltipItemUseCase,
      cache: cacheProvider,
      name: 'tooltip-item',
      max: 30000,
      min: 1
    })
  }
}
