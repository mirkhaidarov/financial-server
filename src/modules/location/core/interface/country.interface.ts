import type { City } from '../entity/city.entity'

export interface CountryInterface {
  readonly id: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly name: string
  readonly cities?: City[]
}
