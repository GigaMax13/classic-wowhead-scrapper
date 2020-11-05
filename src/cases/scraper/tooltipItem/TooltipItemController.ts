import { Request, Response } from 'express'

import { CacheKey, ICacheProvider } from '@providers/ICacheProvider'
import { ScrapperController } from '@classes/ScrapperController'
import { TooltipItemUseCase } from './TooltipItemUseCase'

export class TooltipItemController extends ScrapperController {
  constructor(
    private tooltipItemUseCase: TooltipItemUseCase,
    private cacheProvider: ICacheProvider
  ) {
    super('tooltip-item')
  }

  handle = async (
    { query: { min, max } }: Request,
    response: Response
  ): Promise<Response> => {
    if (this.cacheProvider.has(`${CacheKey.isRunning}:${this.name}`)) {
      return response.status(200).send({
        newItemsFound: this.cacheProvider.get(
          `${CacheKey.newItemsFound}:${this.name}`
        ),
        lastScraped: this.cacheProvider.get(
          `${CacheKey.lastScraped}:${this.name}`
        )
      })
    }

    this.cacheProvider.set(`${CacheKey.isRunning}:${this.name}`, true)

    // known limit [35, 23075] -> [0, max]
    const queue = this.sequentialQueue({
      isMinLimitIncluded: true,
      max: Number(max) || 30000,
      min: Number(min) || 1
    })

    this.linearIterateWithDelay({
      handler: this.tooltipItemUseCase.execute(this.name),
      queue
    })
      .then(() => {
        this.cacheProvider.del([
          `${CacheKey.newItemsFound}:${this.name}`,
          `${CacheKey.lastScraped}:${this.name}`,
          `${CacheKey.isRunning}:${this.name}`
        ])
      })
      .catch(console.error)

    return response.status(202).send()
  }
}
