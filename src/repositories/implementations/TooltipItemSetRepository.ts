import { Document, Schema, model } from 'mongoose'

import { IScrapedEntityRepository } from '../IScrapedEntityRepository'
import { TooltipItemSet } from '@entities/TooltipItemSet'

import '@config/database'

interface TooltipItemDocument extends Document {
  tooltip: string
  entity: number
  name: string
  icon: string
  _id: string
  __v: number
}

const TooltipItemSchema: Schema = new Schema({
  entity: { type: Number, unique: true },
  tooltip: String,
  name: String,
  icon: String,
  _id: String
})

TooltipItemSchema.index({ entity: 1 })
TooltipItemSchema.index({ name: 1 })

TooltipItemSchema.methods.toJSON = function (): TooltipItemSet {
  const { tooltip, entity, name, icon, _id: id } = this.toObject()

  return {
    tooltip,
    entity,
    name,
    icon,
    id
  }
}

const TooltipItemModel = model<TooltipItemDocument>(
  'tooltip-item-set',
  TooltipItemSchema
)

export class TooltipItemSetRepository
  implements IScrapedEntityRepository<TooltipItemSet> {
  async findByEntity(entity: number): Promise<TooltipItemSet | void> {
    try {
      const item = await TooltipItemModel.findOne({ entity }).exec()

      if (item) {
        return Promise.resolve(new TooltipItemSet(item.toJSON()))
      } else {
        return Promise.resolve()
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async save({ id: _id, ...props }: TooltipItemSet): Promise<void> {
    try {
      await TooltipItemModel.create({
        ...props,
        _id
      })

      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
