import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger'
import { ExchangeRateService } from '../services'

@ApiTags('Exchange Rate Controller')
@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchangeRateService) {}

  @Get()
  @ApiOperation({ summary: 'Get converted amount based on rate' })
  @ApiQuery({
    name: 'from',
    type: String,
    required: false,
    example: 'USD',
    description: 'Set base currency that will be convert "to"',
  })
  @ApiQuery({
    name: 'to',
    type: String,
    required: false,
    example: 'EUR',
    description: 'Set in what currency should be converted "from"',
  })
  @ApiQuery({
    name: 'amount',
    type: Number,
    required: true,
    example: 2000,
  })
  @ApiQuery({
    name: 'digits',
    type: Number,
    required: false,
    example: 2,
    description: `Set how much digits should have the converted amount`,
  })
  toGetAmount(
    @Query('amount') amount: number | string,
    @Query('from') from?: string,
    @Query('to') to?: string,
    @Query('digits') digits?: number,
  ) {
    return this.exchangeRateService.getConvertedAmount({
      from,
      to,
      amount,
      digits,
    })
  }
}
