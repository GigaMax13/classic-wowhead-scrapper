export interface ICacheProvider {
  has(key: string): boolean

  set<T>(key: string, val: T, ttl?: number): boolean

  get<T>(key: string): T

  del(key: string | string[]): boolean

  concat<T>(key: string, val: T, limit?: number): boolean
}

export enum CacheKey {
  isRunning = 'IS_RUNNING',
  lastScraped = 'LAST_SCRAPED',
  newItemsFound = 'NEW_ITEMS_FOUND'
}
