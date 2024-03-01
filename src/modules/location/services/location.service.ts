import { v4 as uuid } from 'uuid'
import { Repository } from 'typeorm'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FinancialRecord } from '@modules/transaction/core/entity'
import { getCurrentMonth, getUTCDate } from '@shared/utils'
import { AddCountryDto, AddCityDto } from '../core/dto'
import { Location } from '../core/entity'

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(FinancialRecord)
    private readonly financialRecordRepository: Repository<FinancialRecord>,
  ) {}

  async addCountry({ name, city }: AddCountryDto) {
    try {
      const financialRecord = await this.financialRecordRepository.findOneBy({ recordTitle: getCurrentMonth() })

      if (!financialRecord) {
        return {
          code: HttpStatus.NOT_FOUND,
          status: 'Create any transaction first',
        }
      }

      this.locationRepository.save({
        id: uuid(),
        name,
        city,
        financialRecord,
      })

      return {
        code: HttpStatus.OK,
        status: 'success',
      }
    } catch (error: unknown) {
      console.error(error)
    }
  }

  async addCity({ name }: AddCityDto) {
    try {
      const location = await this.locationRepository.findOne({
        where: {},
        order: { updatedAt: 'DESC', createdAt: 'DESC' },
      })

      if (!location?.id) {
        return {
          code: HttpStatus.NOT_FOUND,
          status: 'Add any country first',
        }
      }

      await this.locationRepository.update(location.id, {
        city: name,
        updatedAt: getUTCDate(),
      })

      return {
        code: HttpStatus.CREATED,
        status: 'updated',
      }
    } catch (error: unknown) {
      console.error(error)
    }
  }
}
