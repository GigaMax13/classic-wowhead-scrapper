import { Document, Schema, model } from 'mongoose'

import { IItemRepository } from '../IItemRepository'
import { Item } from '../../entities/item'

import '../../config/database'

interface ItemDocument extends Document {
  tooltip: string
  quality: number
  entity: number
  name: string
  icon: string
  _id: string
  __v: number
}

const ItemSchema: Schema = new Schema({
  entity: { type: Number, unique: true },
  tooltip: String,
  quality: Number,
  name: String,
  icon: String,
  _id: String
})

ItemSchema.index({ entity: 1 })
ItemSchema.index({ name: 1 })

ItemSchema.methods.toJSON = function (): Item {
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

const ItemModel = model<ItemDocument>('Item', ItemSchema)

export class ItemRepository implements IItemRepository {
  async findByEntity(entity: number): Promise<Item | boolean> {
    try {
      const item = await ItemModel.findOne({ entity }).exec()

      if (item) {
        return Promise.resolve(new Item(item.toJSON()))
      } else {
        return Promise.resolve(false)
      }
    } catch (e) {
      return Promise.reject(e)
    }
  }

  async save({ id: _id, ...props }: Item): Promise<void> {
    try {
      await ItemModel.create({
        ...props,
        _id
      })

      const { entity, name } = props

      console.log('Saved'.padEnd(10, ' '), entity, name)

      return Promise.resolve()
    } catch (e) {
      return Promise.reject(e)
    }
  }
}
