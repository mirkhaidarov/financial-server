import { ApiProperty } from '@nestjs/swagger'
import { TransactionType } from '@core/enums/transaction-type'

export class AddTransactionDto {
  @ApiProperty({
    nullable: false,
    example: 'job',
    description: 'Transaction name, e.g., "health", "education"',
  })
  name: string

  @ApiProperty({
    nullable: false,
    example: TransactionType.EXPENSE,
    description: `Transaction type, e.g., "${TransactionType.EXPENSE}" or "${TransactionType.INCOME}"`,
  })
  type: TransactionType
}
