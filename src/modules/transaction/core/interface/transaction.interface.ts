import type { TransactionType } from '@core/enums/transaction-type'

export type TransactionInterface = {
  readonly id: number
  readonly name: string
  readonly type: TransactionType
}
