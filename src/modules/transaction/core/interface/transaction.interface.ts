import type { TransactionType } from '@core/enums/transaction-type'

export interface TransactionInterface {
  readonly id: string
  readonly name: string
  readonly type: TransactionType
}
