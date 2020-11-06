import { Request, Response } from 'express'

import { CacheKey, ICacheProvider } from '@providers/ICacheProvider'
import { IScraperUseCase } from '@classes/ScraperUseCase'

interface ISequentialQueue {
  isMinLimitIncluded?: boolean
  min?: number
  max?: number
}

interface ILinearIterateThroughPages {
  handler: (c: number) => void
  queue: number[]
  delay?: number
}

export class ScraperController {
  readonly useCase: IScraperUseCase
  readonly cache: ICacheProvider
  readonly name: string
  readonly max?: number
  readonly min?: number

  constructor(props: Omit<ScraperController, 'handle'>) {
    Object.assign(this, props)
  }

  handle = async (
    { query: { min, max } }: Request,
    response: Response
  ): Promise<Response> => {
    if (this.cache.has(`${CacheKey.isRunning}:${this.name}`)) {
      return response.status(200).send({
        newItemsFound: this.cache.get(`${CacheKey.newItemsFound}:${this.name}`),
        lastScraped: this.cache.get(`${CacheKey.lastScraped}:${this.name}`)
      })
    }

    this.cache.set(`${CacheKey.isRunning}:${this.name}`, true)

    const queue = this.sequentialQueue({
      isMinLimitIncluded: true,
      max: Number(max) || this.max,
      min: Number(min) || this.min
    })

    this.linearIterateWithDelay({
      handler: this.useCase.execute(this.name),
      queue
    })
      .then(() => {
        this.cache.del([
          `${CacheKey.newItemsFound}:${this.name}`,
          `${CacheKey.lastScraped}:${this.name}`,
          `${CacheKey.isRunning}:${this.name}`
        ])
      })
      .catch(console.error)

    return response.status(202).send()
  }

  protected sequentialQueue(data: ISequentialQueue): number[] {
    const { isMinLimitIncluded, min = 0, max } = data

    return new Array((isMinLimitIncluded ? max + 1 : max) - min)
      .fill(null)
      .map((v, i) => max - i)
  }

  protected linearIterateWithDelay({
    delay = 100,
    handler,
    queue
  }: ILinearIterateThroughPages): Promise<void> {
    const current = queue.pop()

    try {
      handler(current)
    } catch (e) {
      return Promise.reject(e)
    }

    if (!queue.length) {
      return Promise.resolve()
    }

    return new Promise<void>(resolve => {
      setTimeout(
        () => resolve(this.linearIterateWithDelay({ queue, handler, delay })),
        delay
      )
    })
  }
}
