import { ApiProperty } from '@nestjs/swagger'

export class UpdateAmountDto {
  @ApiProperty({
    nullable: false,
    example: 'job',
    description: 'Transaction name, e.g., "health", "education"',
  })
  name: string

  @ApiProperty({
    nullable: true,
    example: 'EUR',
    description: 'Based on type of currency we will convert amount. For example: EUR => USD',
  })
  currency?: string

  @ApiProperty({
    nullable: false,
    example: 'February',
    description: 'Record title for the financial transaction, e.g., "January", "February"',
  })
  recordTitle: string

  @ApiProperty({
    nullable: false,
    example: 2000,
    description: 'Spending amount',
  })
  amount: number
}
