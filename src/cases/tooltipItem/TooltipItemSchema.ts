import joi from 'joi'

export const TooltipItemSchema = joi.object({
  query: joi.object().keys({
    min: joi.number().min(1),
    max: joi.number().min(1).max(30000)
  })
})
