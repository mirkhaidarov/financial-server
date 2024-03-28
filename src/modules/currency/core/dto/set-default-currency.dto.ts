import { ApiProperty } from '@nestjs/swagger'

export class SetDefaultCurrencyDto {
  @ApiProperty({
    nullable: false,
    example: 'USD',
    description: 'Currency name, e.g., "usd", "eur"',
  })
  name: string
}
