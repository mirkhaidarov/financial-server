import { v4 as uuid } from 'uuid'
import { Repository } from 'typeorm'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ExchangeRateService } from '@infra/exchange-rate'
import { getCurrentMonth, getAmount, getUTCDate } from '@shared/utils'
import { TransactionType } from '@core/enums/transaction-type'
import { FinancialRecord, Transaction } from '../core/entity'
import { CreateTransactionDto, UpdateAmountDto } from '../core/dto'

@Injectable()
export class TransactionService {
  constructor(
    private readonly exchangeRateService: ExchangeRateService,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(FinancialRecord)
    private readonly financialRecordRepository: Repository<FinancialRecord>,
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
    const financialRecords = hasFinancialRecords ? { countries: true } : false

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

  async createTransaction({ name, type }: CreateTransactionDto) {
    try {
      const isTransactionExist = await this.checkIsTransactionExist({ name, type })

      if (isTransactionExist) {
        return {
          code: HttpStatus.FOUND,
          status: 'column already exist',
        }
      }

      await this.transactionRepository.save({
        id: uuid(),
        name,
        type,
      })

      return {
        code: HttpStatus.CREATED,
        status: 'success',
      }
    } catch (error: unknown) {
      throw new Error(
        `Error in TransactionService' service inside "addTransaction" method.
        Provided name: ${name}, type: ${type}. \n${error}`,
      )
    }
  }

  async updateRecordAmount({
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

      const convertedAmount = await this.exchangeRateService.getConvertedAmount({ from: currency, amount })

      if (!financialRecord) {
        this.financialRecordRepository.save({
          id: uuid(),
          amount: getAmount({ amount: convertedAmount }),
          recordTitle,
          transaction,
        })

        return {
          code: HttpStatus.OK,
          status: 'success',
        }
      }

      const { id: recordId, amount: recordAmount } = financialRecord

      await this.financialRecordRepository.update(recordId, {
        amount: getAmount({ amount: convertedAmount, recordAmount }),
        updatedAt: getUTCDate(),
      })

      return {
        code: HttpStatus.CREATED,
        status: 'success',
      }
    } catch (error: unknown) {
      throw new Error(
        `Error in TransactionService' service inside "updateRecordAmount" method.
        Provided name: ${name}, currency: ${currency}, transactionType: ${transactionType}, recordTitle: ${recordTitle}, amount: ${amount}. \n${error}`,
      )
    }
  }

  private async checkIsTransactionExist({ name, type }: CreateTransactionDto) {
    return this.transactionRepository
      .createQueryBuilder('transaction')
      .where('LOWER(transaction.name) = LOWER(:name)', { name })
      .andWhere('LOWER(transaction.type) = LOWER(:type)', { type })
      .getExists()
  }
}
