import { Document, Schema, model } from 'mongoose'

import { TooltipItem } from '@entities/TooltipItem'
import { ITooltipItemRepository } from '../ITooltipItemRepository'

import '../../config/database'

interface TooltipItemDocument extends Document {
  tooltip: string
  quality: number
  entity: string
  name: string
  icon: string
  _id: string
  __v: number
}

const TooltipItemSchema: Schema = new Schema({
  entity: { type: String, unique: true },
  tooltip: String,
  quality: Number,
  name: String,
  icon: String,
  _id: String
})

TooltipItemSchema.index({ entity: 1 })
TooltipItemSchema.index({ name: 1 })

TooltipItemSchema.methods.toJSON = function (): TooltipItem {
  const { tooltip, quality, entity, name, icon, _id: id } = this.toObject()

  return {
    tooltip,
    quality,
    entity,
    name,
    icon,
    id
  }
}

const TooltipItemModel = model<TooltipItemDocument>(
  'tooltip-item',
  TooltipItemSchema
)

export class TooltipItemRepository implements ITooltipItemRepository {
  async findByEntity(entity: string): Promise<TooltipItem | void> {
    try {
      const item = await TooltipItemModel.findOne({ entity }).exec()

      if (item) {
        return Promise.resolve(new TooltipItem(item.toJSON()))
      } else {
        return Promise.resolve()
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async save({ id: _id, ...props }: TooltipItem): Promise<void> {
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
