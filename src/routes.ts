import { Router } from 'express'

import { TooltipItemController, TooltipItemSchema } from '@cases/tooltipItem'

const Routes = Router({ mergeParams: true })

Routes.get('/tooltip-items', TooltipItemSchema, TooltipItemController.handle)

export { Routes }
