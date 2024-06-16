import { ApiProperty } from '@nestjs/swagger'

export class CurrencyDto {
  @ApiProperty({
    nullable: false,
    description: 'User uniq identifier',
  })
  id: number

  @ApiProperty({
    nullable: false,
    example: 'USD',
    description: 'Currency name, e.g., "usd", "eur"',
  })
  currency: string
}
