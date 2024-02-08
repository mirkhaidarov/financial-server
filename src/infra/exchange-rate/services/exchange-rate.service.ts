import { v4 as uuid } from 'uuid'
import type { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpStatus, Injectable } from '@nestjs/common'
import type { ConvertAmountArgs, ExchangeRate, GetConvertedAmountArgs, Currencies } from '../core/types'
import { DefaultCurrency } from '../core/entities'
import { SetDefaultCurrencyDto } from '../core/dto'
import { DEFAULT_AMOUNT, DEFAULT_CURRENCY, EXCHANGE_RATE_URI } from '../core/constants'

@Injectable()
export class ExchangeRateService {
  constructor(
    @InjectRepository(DefaultCurrency)
    private readonly defaultCurrencyRepository: Repository<DefaultCurrency>,
  ) {}

  async setDefaultCurrency({ name }: SetDefaultCurrencyDto) {
    try {
      const result = await this.checkIsRateExist({ name })

      if (!result) {
        return {
          code: HttpStatus.NOT_FOUND,
          status: 'Provided rate name is not exist',
        }
      }

      const previousCurrency = await this.defaultCurrencyRepository.findOne({ where: {} })

      if (previousCurrency) {
        await this.defaultCurrencyRepository.update(previousCurrency, { name })

        return {
          code: HttpStatus.OK,
          status: 'updated',
        }
      }

      await this.defaultCurrencyRepository.save({ id: uuid(), name })

      return {
        code: HttpStatus.OK,
        status: 'created',
      }
    } catch (error: unknown) {
      console.error(
        `Error inside ExchangeRateService in setDefaultCurrency method.
        Setting default currency fail.
        Provided currency name equal: ${name}. \n${error}`,
      )
    }
  }

  async getConvertedAmount({
    from,
    to = DEFAULT_CURRENCY,
    amount = DEFAULT_AMOUNT,
    digits = 2,
  }: GetConvertedAmountArgs) {
    try {
      let defaultCurrency: DefaultCurrency | null = null
      const lowerFrom = from?.toLowerCase()
      const lowerTo = to.toLowerCase()

      if (!lowerFrom) {
        defaultCurrency = await this.defaultCurrencyRepository.findOne({ where: {} })
      }

      const rate = await this.getRate({ from: defaultCurrency?.name || lowerFrom, to: lowerTo })

      return this.convertAmount({ rate, to: lowerTo, amount, digits })
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

  private async checkIsRateExist({ name }: SetDefaultCurrencyDto): Promise<boolean> {
    const currencies = await this.getCurrencies()

    if (!currencies) {
      return false
    }

    return currencies.some((rate) => rate === name)
  }

  private async getRate({ from, to }: { from?: string; to: string }): Promise<number | undefined> {
    try {
      if (!from) {
        throw new Error('The currency name for which the conversion will be performed has not been provided.')
      }
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
