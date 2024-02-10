export interface FinancialRecordInterface {
  readonly id: number
  readonly created_at: Date
  readonly updated_at: Date
  readonly recordTitle: string
  readonly amount: number
}
