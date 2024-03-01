import { v4 as uuid } from 'uuid'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FinancialRecord } from '@modules/transaction/core/entity'
import { getCurrentMonth, getUTCDate } from '@shared/utils'
import { ExceptionService } from '@core/modules/exception'
import { AddCountryDto, AddCityDto } from '../core/dto'
import { Location } from '../core/entity'
import { LocationExceptionMessages } from '../core/exception-messages'

@Injectable()
export class LocationService {
  constructor(
    private readonly exceptionService: ExceptionService,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(FinancialRecord)
    private readonly financialRecordRepository: Repository<FinancialRecord>,
  ) {}

  async addCountry({ name, city }: AddCountryDto) {
    try {
      const financialRecord = await this.financialRecordRepository.findOneBy({ recordTitle: getCurrentMonth() })

      if (!financialRecord) {
        return this.exceptionService.notFound(LocationExceptionMessages.FINANCIAL_RECORD_NOT_FOUND)
      }

      this.locationRepository.save({
        id: uuid(),
        name,
        city,
        financialRecord,
      })

      return this.exceptionService.success({
        message: LocationExceptionMessages.ADD_COUNTRY_SUCCESS,
        data: { name, city },
      })
    } catch (error: unknown) {
      return this.exceptionService.internalServerError(error)
    }
  }

  async addCity({ name }: AddCityDto) {
    try {
      const location = await this.locationRepository.findOne({
        where: {},
        order: { updatedAt: 'DESC', createdAt: 'DESC' },
      })

      if (!location?.id) {
        return this.exceptionService.notFound(LocationExceptionMessages.LOCATION_NOT_FOUND)
      }

      await this.locationRepository.update(location.id, {
        city: name,
        updatedAt: getUTCDate(),
      })

      return this.exceptionService.success({ message: LocationExceptionMessages.ADD_CITY_SUCCESS, data: { name } })
    } catch (error: unknown) {
      return this.exceptionService.internalServerError(error)
    }
  }
}
