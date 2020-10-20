import { v4 } from 'uuid'

export interface IItemDTO {
  tooltip: string
  quality: number
  name: string
  icon: string
}

export class Item {
  readonly id: string

  tooltip: string
  quality: number
  entity: number
  name: string
  icon: string

  constructor(props: Omit<Item, 'id'>) {
    Object.assign(this, props)

    if (!this.id) {
      this.id = v4()
    }
  }
}
