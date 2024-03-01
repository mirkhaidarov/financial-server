import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { TransactionType } from '@core/enums/transaction-type'
import { TransactionService } from '../services'
import { AddTransactionDto, UpdateAmountDto } from '../core/dto'

@ApiTags('Transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @ApiOperation({ summary: 'Get transaction' })
  @ApiQuery({
    name: 'name',
    type: String,
    required: false,
    example: 'job',
    description: 'Filter transactions by name. For example get transaction type of "health" ',
  })
  @ApiQuery({
    name: 'transactionType',
    type: String,
    required: false,
    example: 'Income',
    description: 'Filter transactions by type, e.g., Income or Expense',
  })
  @ApiQuery({
    name: 'recordTitle',
    type: String,
    required: false,
    example: 'February',
    description: `Filter records by title. For example get records witch title equal "January"`,
  })
  @ApiQuery({
    name: 'hasFinancialRecords',
    type: Boolean,
    required: false,
    example: true,
    description: 'Will Transaction response has financialRecords or not',
  })
  async getTransactions(
    @Query('name') name?: string,
    @Query('transactionType') transactionType?: TransactionType,
    @Query('recordTitle') recordTitle?: string,
    @Query('hasFinancialRecords') hasFinancialRecords?: boolean,
  ) {
    return this.transactionService.getTransactions({ name, transactionType, recordTitle, hasFinancialRecords })
  }

  @Post('add')
  @ApiOperation({ summary: 'Add new transaction' })
  @ApiBody({
    type: AddTransactionDto,
  })
  async addTransaction(@Body() body: AddTransactionDto) {
    return this.transactionService.addTransaction(body)
  }

  @Put('update')
  @ApiOperation({ summary: 'Update amount in record' })
  @ApiBody({
    type: UpdateAmountDto,
  })
  async updateRecordAmount(@Body() body: UpdateAmountDto) {
    return this.transactionService.updateRecordAmount(body)
  }
}
