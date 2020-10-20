import { IItemRepository } from '../../repositories/IItemRepository'
import { IItemDTO, Item } from '../../entities/item'
import { axios } from '../../config/axios'

export class ItemTooltipUseCase {
  constructor(private itemRepository: IItemRepository) {}

  execute = async (entity: number): Promise<void> => {
    const exists = await this.itemRepository.findByEntity(entity)

    if (!exists) {
      const entityMask = String(entity).padStart(5, '0')

      try {
        const { status, data } = await axios.get<IItemDTO>(
          `https://classic.wowhead.com/tooltip/item/${entityMask}`
        )

        if (status === 200 && data) {
          const { name } = data

          console.log('Loaded'.padEnd(10, ' '), entity, name)

          await this.itemRepository.save(
            new Item({
              ...data,
              entity
            })
          )
        }
      } catch (e) {
        if (e.response && e.response.status === 404) {
          console.log('Not found'.padEnd(10, ' '), entity)
        } else {
          console.error(e)
        }
      }
    } else {
      console.log('No changes'.padEnd(10, ' '), entity)
    }
  }
}
