import { TooltipItemRepository } from '@repositories/TooltipItemRepository'
import { RouteSchemaValidator } from '@middlewares/RouteSchemaValidator'
import { Cache } from '@providers/CacheProvider'

import { ItemsController as Controller } from './itemsController'
import { ItemsSchema as Schema } from './itemsSchema'
import { ItemsUseCase } from './itemsUseCase'

const tooltipItemRepository = new TooltipItemRepository()
const tooltipItemUseCase = new ItemsUseCase(tooltipItemRepository, Cache)

export const TooltipItemSchema = RouteSchemaValidator.validate(Schema)

export const TooltipItemController = new Controller(tooltipItemUseCase, Cache)
