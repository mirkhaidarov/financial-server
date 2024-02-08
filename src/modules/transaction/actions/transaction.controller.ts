import { Body, Controller, Get, HttpStatus, Put, Query } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TransactionType } from '@core/enums/transaction-type'
import { TransactionService } from '../services'
import { UpdateAmountDto } from '../core/dto'
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
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: () => Transaction })
  async getTransactions(
    @Query('name') name?: string,
    @Query('transactionType') transactionType?: TransactionType,
    @Query('recordTitle') recordTitle?: string,
  ) {
    return this.transactionService.getTransactions({ name, transactionType, recordTitle })
  }

  @Put()
  @ApiOperation({ summary: 'Update amount in record' })
  @ApiBody({
    type: UpdateAmountDto,
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  async updateRecordAmount(@Body() body: UpdateAmountDto) {
    return this.transactionService.updateRecordAmount(body)
  }
}
