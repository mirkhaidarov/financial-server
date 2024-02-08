import { Repository } from 'typeorm'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ExchangeRateService } from '@infra/exchange-rate'
import { getCurrentMonth, getAmount } from '@shared/utils'
import { TransactionType } from '@core/enums/transaction-type'
import { FinancialRecord, Transaction } from '../core/entity'
import { UpdateAmountDto } from '../core/dto'

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
  }: {
    name?: string
    transactionType?: TransactionType
    recordTitle?: string
  }) {
    return this.transactionRepository.find({
      where: { name, type: transactionType, financialRecords: { recordTitle } },
      relations: {
        financialRecords: true,
      },
      order: {
        name: 'ASC',
        financialRecords: {
          recordTitle: 'ASC',
        },
      },
    })
  }

  async updateRecordAmount({ name, recordTitle = getCurrentMonth(), currency, amount }: UpdateAmountDto) {
    try {
      const { id } = await this.transactionRepository.findOneByOrFail({ name: name || '' })
      const { id: recordId, amount: recordAmount } = await this.financialRecordRepository.findOneByOrFail({
        transaction: { id },
        recordTitle,
      })

      const convertedAmount = await this.exchangeRateService.getConvertedAmount({ from: currency, amount })

      await this.financialRecordRepository.update(recordId, {
        amount: getAmount({ amount: convertedAmount, recordAmount }),
        updated_at: new Date(),
      })

      return {
        code: HttpStatus.CREATED,
        status: 'success',
      }
    } catch (error: unknown) {
      throw new Error(
        `Error in TransactionService' service inside "updateRecordAmount" method.
        Provided name: ${name}, recordTitle: ${recordTitle}, amount: ${amount}. \n${error}`,
      )
    }
  }
}
