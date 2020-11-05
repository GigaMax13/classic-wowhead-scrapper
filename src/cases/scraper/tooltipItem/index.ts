import { TooltipItemRepository } from '@repositories/TooltipItemRepository'
import { RouteSchemaValidator } from '@middlewares/RouteSchemaValidator'
import { Cache } from '@providers/CacheProvider'

import { TooltipItemController as Controller } from './TooltipItemController'
import { TooltipItemSchema as Schema } from './TooltipItemSchema'
import { TooltipItemUseCase } from './TooltipItemUseCase'

const tooltipItemRepository = new TooltipItemRepository()
const tooltipItemUseCase = new TooltipItemUseCase(tooltipItemRepository, Cache)

export const TooltipItemSchema = RouteSchemaValidator.validate(Schema)

export const TooltipItemController = new Controller(tooltipItemUseCase, Cache)
