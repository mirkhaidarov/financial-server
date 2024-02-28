import { Body, Controller, Get, HttpStatus, Post, Put, Query } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TransactionType } from '@core/enums/transaction-type'
import { TransactionService } from '../services'
import { CreateTransactionDto, UpdateAmountDto } from '../core/dto'
import { Transaction } from '../core/entity'

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
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: () => Transaction })
  async getTransactions(
    @Query('name') name?: string,
    @Query('transactionType') transactionType?: TransactionType,
    @Query('recordTitle') recordTitle?: string,
    @Query('hasFinancialRecords') hasFinancialRecords?: boolean,
  ) {
    return this.transactionService.getTransactions({ name, transactionType, recordTitle, hasFinancialRecords })
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiBody({
    type: CreateTransactionDto,
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  async addTransaction(@Body() body: CreateTransactionDto) {
    return this.transactionService.createTransaction(body)
  }

  @Put('update')
  @ApiOperation({ summary: 'Update amount in record' })
  @ApiBody({
    type: UpdateAmountDto,
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  async updateRecordAmount(@Body() body: UpdateAmountDto) {
    return this.transactionService.updateRecordAmount(body)
  }
}
