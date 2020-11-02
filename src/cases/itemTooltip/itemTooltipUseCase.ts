import { IItemTooltipRepository } from '../../repositories/IItemTooltipRepository'
import { IItemDTO, ItemTooltip } from '../../entities/itemTooltip'
import { axios } from '../../config/axios'

export class ItemTooltipUseCase {
  constructor(private itemRepository: IItemTooltipRepository) {}

  execute = async (entity: number): Promise<void> => {
    const maskedEntity = String(entity).padStart(5, '0')
    const exists = await this.itemRepository.findByEntity(maskedEntity)

    if (!exists) {
      try {
        const { status, data } = await axios.get<IItemDTO>(
          `https://classic.wowhead.com/tooltip/item/${maskedEntity}`
        )

        if (status === 200 && data) {
          // console.log('Loaded'.padEnd(10, ' '), entity, name)

          await this.itemRepository.save(
            new ItemTooltip({
              entity: maskedEntity,
              ...data
            })
          )
        }
      } catch (e) {
        if (e.response && e.response.status === 404) {
          // console.log('Not found'.padEnd(10, ' '), entity)
        } else {
          console.error(e)
        }
      }
    } else {
      // console.log('No changes'.padEnd(10, ' '), entity)
    }
  }
}
