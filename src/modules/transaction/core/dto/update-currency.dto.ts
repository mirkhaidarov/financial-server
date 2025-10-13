import { ApiProperty } from '@nestjs/swagger'
import { TransactionType } from '@core/enums/transaction-type'

export class UpdateCurrencyDto {
  @ApiProperty({
    nullable: false,
    example: 'usd',
    description: 'Currency name, e.g., "usd", "eur"',
  })
  currency: string

  @ApiProperty({
    nullable: false,
    example: 'job',
    description: 'Transaction name, e.g., "health", "education"',
  })
  transactionName: string

  @ApiProperty({
    nullable: false,
    example: TransactionType.INCOME,
    description: `Transaction type, e.g., "${TransactionType.EXPENSE}" or "${TransactionType.INCOME}"`,
  })
  transactionType: TransactionType
}
