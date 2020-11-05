import NodeCache from 'node-cache'

import { ICacheProvider } from '../ICacheProvider'

class CacheProvider implements ICacheProvider {
  private readonly cache: NodeCache

  constructor() {
    this.cache = new NodeCache()
  }

  has(key: string): boolean {
    return this.cache.has(key)
  }

  set<T>(key: string, val: T, ttl?: number): boolean {
    return this.cache.set<T>(key, val, ttl)
  }

  get<T>(key: string): T {
    return this.cache.get<T>(key)
  }

  del(key: string | string[]): boolean {
    if (Array.isArray(key)) {
      return this.cache.del(key) === key.length
    }

    return this.cache.del(key) === 1
  }

  concat<T>(key: string, val: T, limit = 100): boolean {
    if (this.has(key)) {
      const total = this.get<T[]>(key).concat(val)

      return this.set<T[]>(key, total.slice(Math.max(total.length - limit, 0)))
    }

    return this.set<T[]>(key, [val])
  }
}

export const Cache = new CacheProvider()
