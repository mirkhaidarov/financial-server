import { v4 as uuid } from 'uuid'
import type { Repository } from 'typeorm'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ExchangeRateService } from '@infra/exchange-rate'
import { getUTCDate } from '@shared/utils'
import { SetDefaultCurrencyDto } from '../core/dto'
import { DefaultCurrency } from '../core/entities'

@Injectable()
export class CurrencyService {
  constructor(
    private readonly exchangeRateService: ExchangeRateService,
    @InjectRepository(DefaultCurrency)
    private readonly defaultCurrencyRepository: Repository<DefaultCurrency>,
  ) {}

  async setDefaultCurrency({ name }: SetDefaultCurrencyDto) {
    try {
      const result = await this.exchangeRateService.checkIsRateExist(name)

      if (!result) {
        return {
          code: HttpStatus.NOT_FOUND,
          status: 'Provided rate name is not exist',
        }
      }

      const { id: previousCurrencyId } = (await this.defaultCurrencyRepository.findOne({ where: {} })) || {}

      if (previousCurrencyId) {
        await this.defaultCurrencyRepository.update(previousCurrencyId, {
          name,
          updatedAt: getUTCDate(),
        })

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
}
