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
export class ScrapperController {
  constructor(protected name?: string) {}

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
