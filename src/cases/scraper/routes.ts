import { Router } from 'express'

import { TooltipItemController, TooltipItemSchema } from './tooltipItem'

const ScraperRoutes = Router({ mergeParams: true })

ScraperRoutes.get(
  '/tooltip-items',
  TooltipItemSchema,
  TooltipItemController.handle
)

export { ScraperRoutes }
