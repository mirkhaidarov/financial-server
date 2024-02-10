import type { TransactionType } from '@core/enums/transaction-type'

export interface TransactionInterface {
  readonly id: number
  readonly name: string
  readonly type: TransactionType
}
