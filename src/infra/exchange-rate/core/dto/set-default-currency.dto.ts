import { ApiProperty } from '@nestjs/swagger'

export class SetDefaultCurrencyDto {
  @ApiProperty({
    example: 'USD',
  })
  name: string
}
