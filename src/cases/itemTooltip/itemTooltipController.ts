import { ItemTooltipUseCase } from './itemTooltipUseCase'
import { ScrapperController } from '../../base/scrapperController'

export class ItemTooltipController extends ScrapperController {
  constructor(private itemTooltipUseCase: ItemTooltipUseCase) {
    super()
  }

  handle = async (): Promise<void> => {
    // known limit [35, 23075]
    const queue = this.linearLimitQueue(30000)

    await this.linearIterateWithDelay(queue, this.itemTooltipUseCase.execute)
  }
}
