import { v4 } from 'uuid'

export interface ITooltipItemDTO {
  tooltip: string
  quality: number
  name: string
  icon: string
}

export class TooltipItem {
  readonly id: string

  tooltip: string
  quality: number
  entity: number
  name: string
  icon: string

  constructor(props: Omit<TooltipItem, 'id'>) {
    Object.assign(this, props)

    if (!this.id) {
      this.id = v4()
    }
  }
}
