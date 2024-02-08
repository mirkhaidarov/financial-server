export type Currencies = Record<string, number>

export type ExchangeRate = {
  [currency: string]: Currencies
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
