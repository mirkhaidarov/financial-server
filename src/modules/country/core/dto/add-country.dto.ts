import { ApiProperty } from '@nestjs/swagger'

export class AddCountryDto {
  @ApiProperty({ nullable: false })
  id: string

  @ApiProperty({
    nullable: true,
    description: 'Country name, e.g., "Korea", "Mongolia"',
  })
  name?: string

  @ApiProperty({
    nullable: true,
    description: 'Country city, e.g., "Seoul", "Ulaanbaatar"',
  })
  city?: string
}
