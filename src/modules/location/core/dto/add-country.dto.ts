import { ApiProperty } from '@nestjs/swagger'

export class AddCountryDto {
  @ApiProperty({ nullable: false })
  id: string

  @ApiProperty({
    nullable: false,
    description: 'Country name, e.g., "Korea", "Mongolia"',
  })
  name: string

  @ApiProperty({
    nullable: true,
    description: 'City name, e.g., "Seoul", "Busan"',
  })
  city: string
}
