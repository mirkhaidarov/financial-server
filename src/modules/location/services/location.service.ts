import { v4 as uuid } from 'uuid'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ExceptionService } from '@core/modules/exception'
import { AddCountryDto, AddCityDto } from '../core/dto'
import { City, Country } from '../core/entity'
import { LocationExceptionMessages } from '../core/exception-messages'

@Injectable()
export class LocationService {
  constructor(
    private readonly exceptionService: ExceptionService,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async addCountry({ name }: AddCountryDto) {
    try {
      await this.countryRepository.save({
        id: uuid(),
        name,
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
      const [lastCountry] = await this.countryRepository.find({ take: 1, order: { createdAt: 'DESC' } })

      if (!lastCountry) {
        this.exceptionService.notFound(LocationExceptionMessages.COUNTRY_NOT_FOUND)
      }

      await this.cityRepository.save({
        id: uuid(),
        name,
        country: lastCountry,
      })

      return this.exceptionService.success({ message: LocationExceptionMessages.ADD_CITY_SUCCESS, data: name })
    } catch (error: unknown) {
      this.exceptionService.internalServerError(error)
    }
  }
}
