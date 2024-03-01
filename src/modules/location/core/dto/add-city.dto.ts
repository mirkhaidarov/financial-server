import { ApiProperty } from '@nestjs/swagger'

export class AddCityDto {
  @ApiProperty({ nullable: false })
  id: string

  @ApiProperty({
    nullable: false,
    description: 'City name, e.g., "Seoul", "Ulaanbaatar"',
  })
  name: string
}
