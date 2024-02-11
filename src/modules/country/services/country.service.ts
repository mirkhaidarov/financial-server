import { v4 as uuid } from 'uuid'
import { Repository } from 'typeorm'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AddCountryDto } from '../core/dto'
import { Country } from '../core/entity'

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  addCountry({ name, city }: AddCountryDto) {
    try {
      this.countryRepository.save({
        id: uuid(),
        name,
        city,
      })
      return { status: HttpStatus.CREATED, description: 'Success' }
    } catch (error: unknown) {
      console.error(error)
    }
  }
}
