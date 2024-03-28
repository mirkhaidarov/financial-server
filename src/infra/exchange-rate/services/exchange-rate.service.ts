import { Injectable } from '@nestjs/common'
import { ExceptionService } from '@core/modules/exception'
import type { SuccessResponse } from '@core/modules/exception'
import type { ConvertAmountArgs, CurrencyAmount, ExchangeRate, GetConvertedAmountArgs } from '../core/types'
import { DEFAULT_AMOUNT, DEFAULT_CURRENCY, EXCHANGE_RATE_URI } from '../core/constants'
import { ExchangeRateExceptionMessages } from '../core/exception-messages'

@Injectable()
export class ExchangeRateService {
  constructor(private readonly exceptionService: ExceptionService) {}

  async getConvertedAmount({
    from,
    to = DEFAULT_CURRENCY,
    amount = DEFAULT_AMOUNT,
    digits = 2,
  }: GetConvertedAmountArgs) {
    try {
      const lowerFrom = from?.toLowerCase()
      const lowerTo = to.toLowerCase()

      const isFromExist = await this.checkIsCurrencyExist(lowerFrom)
      const isToExist = await this.checkIsCurrencyExist(lowerTo)

      if (!isFromExist && !isToExist) {
        this.exceptionService.notFound(ExchangeRateExceptionMessages.CURRENCY_NOT_FOUND)
      }

      const rate = await this.getRate({ from: lowerFrom, to: lowerTo })
      return this.convertAmount({ rate, to: lowerTo, amount, digits })
    } catch (error: unknown) {
      this.exceptionService.internalServerError(error)
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

  async checkIsCurrencyExist(name: string): Promise<boolean> {
    const currencies = await this.getCurrencies()

    if (!currencies.length) {
      return false
    }

    return currencies.some((currency) => currency === name)
  }

  private async getRate({ from, to }: { from: string; to: string }): Promise<number | undefined> {
    const { data } = await this.fetchCurrenciesRate(from)

    if (!data) {
      return
    }

    return data[to]
  }

  private async getCurrencies(): Promise<string[]> {
    const { data } = await this.fetchCurrenciesRate()

    if (!data) {
      return []
    }

    return Object.keys(data)
  }

  private async fetchCurrenciesRate(currency: string = DEFAULT_CURRENCY): Promise<SuccessResponse<CurrencyAmount>> {
    try {
      const URI = `${EXCHANGE_RATE_URI}/${currency}.min.json`

      const response = await fetch(URI)

      if (!response.ok) {
        this.exceptionService.internalServerError(response.statusText)
      }

      const result: ExchangeRate = await response.json()

      return this.exceptionService.success({
        data: result[currency],
        message: response.statusText,
      })
    } catch (error: unknown) {
      this.exceptionService.internalServerError(error)
    }
  }
}
