import { v4 as uuid } from 'uuid'
import { Repository } from 'typeorm'
import type { FindManyOptions } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FinancialRecord } from '@modules/transaction/core/entity'
import { getCurrentMonth } from '@shared/utils'
import { ExceptionService } from '@core/modules/exception'
import { AddCountryDto, AddCityDto } from '../core/dto'
import { City, Country } from '../core/entity'
import { LocationExceptionMessages } from '../core/exception-messages'
import { TransactionType } from '@core/enums/transaction-type'

@Injectable()
export class LocationService {
  constructor(
    private readonly exceptionService: ExceptionService,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(FinancialRecord)
    private readonly financialRecordRepository: Repository<FinancialRecord>,
  ) {}

  async addCountry({ name }: AddCountryDto) {
    try {
      const expenseFinancialRecords = await this.getExpenseFinancialRecords()

      if (!expenseFinancialRecords.length) {
        this.exceptionService.notFound(LocationExceptionMessages.FINANCIAL_RECORD_NOT_FOUND)
      }

      expenseFinancialRecords.map(async (financialRecord) => {
        await this.countryRepository.save({
          id: uuid(),
          name,
          financialRecord,
        })
      })

      return this.exceptionService.success({
        message: LocationExceptionMessages.ADD_COUNTRY_SUCCESS,
        data: name,
      })
    } catch (error: unknown) {
      this.exceptionService.internalServerError(error)
    }
  }

  async addCity({ name }: AddCityDto) {
    try {
      const expenseFinancialRecords = await this.getExpenseFinancialRecords(true)

      if (!expenseFinancialRecords.length) {
        this.exceptionService.notFound(LocationExceptionMessages.FINANCIAL_RECORD_NOT_FOUND)
      }

      expenseFinancialRecords.map(async ({ countries }) => {
        const lastCountry = countries.at(0)

        if (lastCountry) {
          await this.cityRepository.save({
            id: uuid(),
            name,
            country: lastCountry,
          })
        }
      })

      return this.exceptionService.success({ message: LocationExceptionMessages.ADD_CITY_SUCCESS, data: name })
    } catch (error: unknown) {
      this.exceptionService.internalServerError(error)
    }
  }

  private async getExpenseFinancialRecords(withCountry = false) {
    const options: FindManyOptions<FinancialRecord> = {
      where: {
        transaction: {
          type: TransactionType.EXPENSE,
        },
        recordTitle: getCurrentMonth(),
      },
      relations: withCountry ? { countries: true } : null,
      order: withCountry ? { countries: { updatedAt: 'DESC', createdAt: 'DESC' } } : null,
    }

    return this.financialRecordRepository.find(options)
  }
}
