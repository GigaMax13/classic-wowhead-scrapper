import { Document, Schema, model } from 'mongoose'

import { IItemTooltipRepository } from '../IItemTooltipRepository'
import { ItemTooltip } from '../../entities/itemTooltip'

import '../../config/database'

interface ItemDocument extends Document {
  tooltip: string
  quality: number
  entity: string
  name: string
  icon: string
  _id: string
  __v: number
}

const ItemTooltipSchema: Schema = new Schema({
  entity: { type: String, unique: true },
  tooltip: String,
  quality: Number,
  name: String,
  icon: String,
  _id: String
})

ItemTooltipSchema.index({ entity: 1 })
ItemTooltipSchema.index({ name: 1 })

ItemTooltipSchema.methods.toJSON = function (): ItemTooltip {
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

const ItemTooltipModel = model<ItemDocument>('items-tooltip', ItemTooltipSchema)

export class ItemTooltipRepository implements IItemTooltipRepository {
  async findByEntity(entity: string): Promise<ItemTooltip | boolean> {
    try {
      const item = await ItemTooltipModel.findOne({ entity }).exec()

      if (item) {
        return Promise.resolve(new ItemTooltip(item.toJSON()))
      } else {
        return Promise.resolve(false)
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async save({ id: _id, ...props }: ItemTooltip): Promise<void> {
    try {
      await ItemTooltipModel.create({
        ...props,
        _id
      })

      // console.log('Saved'.padEnd(10, ' '), Number(entity), name)

      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
