import { ApiProperty } from '@nestjs/swagger'

export class AddCountryDto {
  @ApiProperty({ nullable: false })
  id: string

  @ApiProperty({
    nullable: false,
    description: 'Country name, e.g., "Korea", "Mongolia"',
  })
  name: string
}
