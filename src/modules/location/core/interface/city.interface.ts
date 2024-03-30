import type { Country } from '../entity/country.entity'

export interface CityInterface {
  readonly id: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly name: string
  readonly country: Country
}
