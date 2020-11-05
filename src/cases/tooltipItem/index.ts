import { TooltipItemRepository } from '@repositories/implementations/TooltipItemRepository'
import { RouteSchemaValidator } from '@middlewares/routeSchemaValidator'
import { Cache } from '@providers/implementations/cacheProvider'

import { TooltipItemUseCase } from './TooltipItemUseCase'
import { TooltipItemController as Controller } from './TooltipItemController'
import { TooltipItemSchema as Schema } from './TooltipItemSchema'

const tooltipItemRepository = new TooltipItemRepository()
const tooltipItemUseCase = new TooltipItemUseCase(tooltipItemRepository, Cache)

const TooltipItemSchema = RouteSchemaValidator.validate(Schema)

const TooltipItemController = new Controller(tooltipItemUseCase, Cache)

export { TooltipItemSchema, TooltipItemController }
