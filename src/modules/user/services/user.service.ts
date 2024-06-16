import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ExceptionService } from '@core/modules/exception'
import { ExchangeRateService } from '@infra/exchange-rate'
import { getUTCDate } from '@shared/utils'
import { DEFAULT_CURRENCY } from '@infra/exchange-rate/core/constants'
import { User } from '../core/entity'
import { AddUserDto, CurrencyDto } from '../core/dto'
import { UserExceptionMessages } from '../core/exception-messages'

@Injectable()
export class UserService {
  constructor(
    private readonly exceptionService: ExceptionService,
    private readonly exchangeRateService: ExchangeRateService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async addUser({ id, firstName, lastName, nickName, language }: AddUserDto) {
    try {
      const user = await this.userRepository.findOneBy({ id })

      if (user) {
        return this.exceptionService.success({ message: UserExceptionMessages.ADD_USER_EXIST })
      }

      await this.userRepository.save({
        id,
        firstName,
        lastName,
        nickName,
        language,
        currency: DEFAULT_CURRENCY,
      })

      return this.exceptionService.success({ message: UserExceptionMessages.ADD_USER_SUCCESS })
    } catch (error: unknown) {
      return this.exceptionService.internalServerError(error)
    }
  }

  async updateCurrency({ id, currency }: CurrencyDto) {
    try {
      const isCurrencyExist = await this.exchangeRateService.checkIsCurrencyExist(currency)

      if (!isCurrencyExist) {
        this.exceptionService.notFound(UserExceptionMessages.CURRENCY_NOT_FOUND)
      }

      const { id: userId } = await this.userRepository.findOneByOrFail({ id })

      await this.userRepository.update(userId, {
        currency,
        updatedAt: getUTCDate(),
      })

      return this.exceptionService.success({
        message: UserExceptionMessages.UPDATE_CURRENCY_SUCCESS,
      })
    } catch (error: unknown) {
      this.exceptionService.internalServerError(error)
    }
  }
}
