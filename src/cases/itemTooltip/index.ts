import { ItemTooltipRepository } from '../../repositories/implementations/itemTooltipRepository'
import { ItemTooltipUseCase } from './itemTooltipUseCase'
import { ItemTooltipController } from './itemTooltipController'

const itemRepository = new ItemTooltipRepository()
const itemTooltipUseCase = new ItemTooltipUseCase(itemRepository)
const itemTooltipController = new ItemTooltipController(itemTooltipUseCase)

export { itemTooltipController }
