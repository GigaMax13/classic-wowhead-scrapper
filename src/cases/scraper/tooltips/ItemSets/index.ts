import { TooltipItemSetRepository } from '@repositories/TooltipItemSetRepository'
import { RouteSchemaValidator } from '@middlewares/RouteSchemaValidator'
import { Cache } from '@providers/CacheProvider'

import { ItemSetsController as Controller } from './itemSetsController'
import { ItemSetsSchema as Schema } from './itemSetsSchema'
import { ItemSetsUseCase } from './itemSetsUseCase'

const tooltipItemRepository = new TooltipItemSetRepository()
const tooltipItemUseCase = new ItemSetsUseCase(tooltipItemRepository, Cache)

export const TooltipItemSetSchema = RouteSchemaValidator.validate(Schema)

export const TooltipItemSetController = new Controller(
  tooltipItemUseCase,
  Cache
)
