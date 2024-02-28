import { Injectable } from '@nestjs/common'
import type { ConvertAmountArgs, ExchangeRate, GetConvertedAmountArgs, Currencies } from '../core/types'
import { DEFAULT_AMOUNT, DEFAULT_CURRENCY, EXCHANGE_RATE_URI } from '../core/constants'

@Injectable()
export class ExchangeRateService {
  async getConvertedAmount({
    from,
    to = DEFAULT_CURRENCY,
    amount = DEFAULT_AMOUNT,
    digits = 2,
  }: GetConvertedAmountArgs) {
    try {
      const lowerFrom = from?.toLowerCase()
      const lowerTo = to.toLowerCase()

      const isFromExist = await this.checkIsRateExist(lowerFrom)
      const isToExist = await this.checkIsRateExist(lowerTo)

      if (isFromExist && isToExist) {
        const rate = await this.getRate({ from: lowerFrom, to: lowerTo })
        return this.convertAmount({ rate, to: lowerTo, amount, digits })
      }

      throw new Error()
    } catch (error: unknown) {
      console.error(
        `Error in ExchangeRateService inside getConvertedAmount method.
         Params equals - from: ${from}, to: ${to} and amount: ${amount}. \n${error}`,
      )
    }
  }

  private convertAmount({ rate, to, amount, digits }: ConvertAmountArgs): string | number {
    if (!rate) {
      return DEFAULT_AMOUNT
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: to,
      maximumFractionDigits: digits,
    })
      .format(rate * Number(amount))
      .replace(/[^0-9.]/g, '')
  }

  async checkIsRateExist(name: string): Promise<boolean> {
    const currencies = await this.getCurrencies()

    if (!currencies) {
      return false
    }

    return currencies.some((rate) => rate === name)
  }

  private async getRate({ from, to }: { from?: string; to: string }): Promise<number | undefined> {
    try {
      const URI = `${EXCHANGE_RATE_URI}/${from}/${to}.json`

      const response = await fetch(URI)

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const result: Currencies = await response.json()

      return result[to]
    } catch (error: unknown) {
      console.error(error)
      return
    }
  }

  private async getCurrencies(): Promise<string[] | undefined> {
    const currency = DEFAULT_CURRENCY
    const URI = `${EXCHANGE_RATE_URI}/${DEFAULT_CURRENCY}.json`

    try {
      const response = await fetch(URI)

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const result: ExchangeRate = await response.json()
      const currencies = Object.keys(result[currency])

      return currencies
    } catch (error: unknown) {
      console.error(error)
      return
    }
  }
}
