import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SetDefaultCurrencyDto } from '../core/dto'
import { CurrencyService } from '../services'

@ApiTags('Currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post('create')
  @ApiOperation({ summary: 'Set default currency' })
  @ApiBody({
    type: SetDefaultCurrencyDto,
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  toSetDefaultCurrency(@Body() body: SetDefaultCurrencyDto) {
    return this.currencyService.setDefaultCurrency({ name: body.name.toLowerCase() })
  }
}
