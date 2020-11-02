export class ScrapperController {
  protected linearLimitQueue(size: number, isZeroIncluded?: boolean): number[] {
    return new Array(isZeroIncluded ? size + 1 : size)
      .fill(null)
      .map((v, i) => size - i)
  }

  protected linearIterateWithDelay(
    queue: number[],
    func: (c: number) => void,
    delay = 100
  ): Promise<void> {
    const current = queue.pop()

    try {
      func(current)
    } catch (e) {
      return Promise.reject(e)
    }

    if (!queue.length) {
      return Promise.resolve()
    }

    return new Promise<void>(resolve => {
      setTimeout(
        () => resolve(this.linearIterateWithDelay(queue, func, delay)),
        delay
      )
    })
  }
}
