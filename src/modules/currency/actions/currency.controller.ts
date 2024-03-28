import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { SetDefaultCurrencyDto } from '../core/dto'
import { CurrencyService } from '../services'

@ApiTags('Currency')
@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post('add')
  @ApiOperation({ summary: 'Add default currency' })
  @ApiBody({
    type: SetDefaultCurrencyDto,
  })
  addDefaultCurrency(@Body() body: SetDefaultCurrencyDto) {
    return this.currencyService.addDefaultCurrency({ name: body.name.toLowerCase() })
  }
}
