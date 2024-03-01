import { v4 as uuid } from 'uuid'
import type { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ExchangeRateService } from '@infra/exchange-rate'
import { getUTCDate } from '@shared/utils'
import { ExceptionService } from '@core/modules/exception'
import { SetDefaultCurrencyDto } from '../core/dto'
import { DefaultCurrency } from '../core/entities'
import { CurrencyExceptionMessages } from '../core/exception-messages'

@Injectable()
export class CurrencyService {
  constructor(
    private readonly exceptionService: ExceptionService,
    private readonly exchangeRateService: ExchangeRateService,
    @InjectRepository(DefaultCurrency)
    private readonly defaultCurrencyRepository: Repository<DefaultCurrency>,
  ) {}

  async addDefaultCurrency({ name }: SetDefaultCurrencyDto) {
    try {
      const isRateExist = await this.exchangeRateService.checkIsRateExist(name)

      if (!isRateExist) {
        return this.exceptionService.notFound(CurrencyExceptionMessages.RATE_NOT_FOUND)
      }

      const { id: previousCurrencyId } = (await this.defaultCurrencyRepository.findOne({ where: {} })) || {}

      if (previousCurrencyId) {
        await this.defaultCurrencyRepository.update(previousCurrencyId, {
          name,
          updatedAt: getUTCDate(),
        })

        return this.exceptionService.success({
          message: CurrencyExceptionMessages.UPDATE_CURRENCY_SUCCESS,
        })
      }

      await this.defaultCurrencyRepository.save({ id: uuid(), name })

      return this.exceptionService.success({ message: CurrencyExceptionMessages.ADD_CURRENCY_SUCCESS })
    } catch (error: unknown) {
      return this.exceptionService.internalServerError(error)
    }
  }
}
