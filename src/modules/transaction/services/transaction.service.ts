import { v4 as uuid } from 'uuid'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ExchangeRateService } from '@infra/exchange-rate'
import { getCurrentMonth, getAmount, getUTCDate } from '@shared/utils'
import { TransactionType } from '@core/enums/transaction-type'
import { User } from '@modules/user/core/entity'
import { Country } from '@modules/location/core/entity'
import { ExceptionService } from '@core/modules/exception'
import { FinancialRecord, Transaction } from '../core/entity'
import { AddTransactionDto, UpdateAmountDto } from '../core/dto'
import { TransactionExceptionMessages } from '../core/exception-messages'

@Injectable()
export class TransactionService {
  constructor(
    private readonly exceptionService: ExceptionService,
    private readonly exchangeRateService: ExchangeRateService,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(FinancialRecord)
    private readonly financialRecordRepository: Repository<FinancialRecord>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async getTransactions({
    name,
    transactionType,
    recordTitle,
    hasFinancialRecords,
  }: {
    name?: string
    transactionType?: TransactionType
    hasFinancialRecords?: boolean
    recordTitle?: string
  }) {
    const financialRecords = hasFinancialRecords ? { countries: { cities: true } } : false

    return this.transactionRepository.find({
      where: { name, type: transactionType, financialRecords: { recordTitle } },
      relations: {
        financialRecords,
      },
      order: {
        name: 'ASC',
        financialRecords: {
          recordTitle: 'ASC',
        },
      },
    })
  }

  async addTransaction({ name, type }: AddTransactionDto) {
    try {
      const isTransactionExist = await this.checkIsTransactionExist({ name, type })

      if (isTransactionExist) {
        return this.exceptionService.success({ message: TransactionExceptionMessages.ADD_TRANSACTION_EXIST })
      }

      await this.transactionRepository.save({
        id: uuid(),
        name,
        type,
      })

      return this.exceptionService.success({ message: TransactionExceptionMessages.ADD_TRANSACTION_SUCCESS })
    } catch (error: unknown) {
      return this.exceptionService.internalServerError(error)
    }
  }

  async updateRecordAmount({
    id,
    name,
    transactionType,
    recordTitle = getCurrentMonth(),
    currency,
    amount,
  }: UpdateAmountDto) {
    try {
      const transaction = await this.transactionRepository.findOneByOrFail({ name, type: transactionType })
      const financialRecord = await this.financialRecordRepository.findOneBy({
        transaction: { id: transaction.id },
        recordTitle,
      })
      const user = await this.userRepository.findOneBy({ id })
      const [lastCountry] = await this.countryRepository.find({
        take: 1,
        order: { createdAt: 'DESC' },
        relations: { financialRecord: true },
      })

      const convertedAmount = await this.exchangeRateService.getConvertedAmount({
        from: currency || user.currency,
        amount,
      })

      if (!financialRecord) {
        this.financialRecordRepository.save({
          id: uuid(),
          amount: getAmount({ amount: convertedAmount }),
          recordTitle,
          transaction,
          countries: [lastCountry],
        })

        return this.exceptionService.success({ message: TransactionExceptionMessages.ADD_RECORD_AMOUNT_SUCCESS })
      }

      if (!lastCountry?.financialRecord) {
        await this.countryRepository.update(lastCountry.id, {
          financialRecord,
        })
      }

      const { id: recordId, amount: recordAmount } = financialRecord

      await this.financialRecordRepository.update(recordId, {
        amount: getAmount({ amount: convertedAmount, recordAmount }),
        updatedAt: getUTCDate(),
      })

      return this.exceptionService.success({ message: TransactionExceptionMessages.UPDATE_RECORD_AMOUNT_SUCCESS })
    } catch (error: unknown) {
      return this.exceptionService.internalServerError(error)
    }
  }

  private async checkIsTransactionExist({ name, type }: AddTransactionDto) {
    return this.transactionRepository
      .createQueryBuilder('transaction')
      .where('LOWER(transaction.name) = LOWER(:name)', { name })
      .andWhere('LOWER(transaction.type) = LOWER(:type)', { type })
      .getExists()
  }
}
