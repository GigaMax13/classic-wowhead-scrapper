import { Router } from 'express'

import { TooltipItemController, TooltipItemSchema } from './tooltips/Items'
import {
  TooltipItemSetController,
  TooltipItemSetSchema
} from './tooltips/ItemSets'

const ScraperRoutes = Router({ mergeParams: true })

ScraperRoutes.get(
  '/tooltip/items',
  TooltipItemSchema,
  TooltipItemController.handle
)

ScraperRoutes.get(
  '/tooltip/item-sets',
  TooltipItemSetSchema,
  TooltipItemSetController.handle
)

export { ScraperRoutes }
