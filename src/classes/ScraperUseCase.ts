import { axios } from '@config/axios'

import { IScrapedEntityRepository } from '@repositories/IScrapedEntityRepository'
import { CacheKey, ICacheProvider } from '@providers/ICacheProvider'
import { IFactoryConstructor, Factory } from '@classes/Factory'

export interface IScraperUseCase {
  execute: (cacheName: string) => (entity: number) => Promise<void>
}

export class ScraperUseCase<Entity, DTO> implements IScraperUseCase {
  readonly entityConstructor: IFactoryConstructor<Entity>
  readonly repository: IScrapedEntityRepository<Entity>
  readonly cache: ICacheProvider
  readonly url: string

  constructor(props: Omit<ScraperUseCase<Entity, DTO>, 'execute'>) {
    Object.assign(this, props)
  }

  execute = (cacheName: string) => async (entity: number): Promise<void> => {
    if (!this.cache.has(`${CacheKey.isRunning}:${cacheName}`)) {
      return Promise.resolve()
    }

    const exists = await this.repository.findByEntity(entity)

    this.cache.set(`${CacheKey.lastScraped}:${cacheName}`, entity)

    if (!exists) {
      try {
        const { status, data } = await axios.get<DTO>(`${this.url}${entity}`)

        if (status === 200 && data) {
          this.cache.concat(
            `${CacheKey.newItemsFound}:${cacheName}`,
            entity,
            10
          )

          await this.repository.save(
            Factory.create(this.entityConstructor, {
              ...data,
              entity
            })
          )
        }
      } catch (e) {
        if (!e?.response?.status) {
          console.error(e)
        } else if (e?.response?.status !== 404) {
          console.log(entity, e.message)
        }
      }
    }
  }
}
