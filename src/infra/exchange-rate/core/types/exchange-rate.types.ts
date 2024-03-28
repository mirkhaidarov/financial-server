export type CurrencyAmount = Record<string, number>

type Date = {
  date: string
}

export type ExchangeRate = Date & {
  [currency: string]: CurrencyAmount
}

export type ConvertAmountArgs = {
  to: string
  amount: number | string
  rate?: number
  digits?: number
}

export type GetConvertedAmountArgs = {
  amount: number | string
  from?: string
  to?: string
  digits?: number
}
