import { v4 } from 'uuid'

export interface ITooltipItemSetDTO {
  tooltip: string
  name: string
  icon: string
}

export class TooltipItemSet {
  readonly id: string

  tooltip: string
  entity: number
  name: string
  icon: string

  constructor(props: Omit<TooltipItemSet, 'id'>) {
    Object.assign(this, props)

    if (!this.id) {
      this.id = v4()
    }
  }
}
