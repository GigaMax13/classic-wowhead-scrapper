import { ItemRepository } from '../../repositories/implementations/itemRepository'
import { ItemTooltipUseCase } from './itemTooltipUseCase'
import { ItemTooltipController } from './itemTooltipController'

const itemRepository = new ItemRepository()
const itemTooltipUseCase = new ItemTooltipUseCase(itemRepository)
const itemTooltipController = new ItemTooltipController(itemTooltipUseCase)

export { itemTooltipController }
