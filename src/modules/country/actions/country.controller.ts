import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { CountryService } from '../services'
import { AddCountryDto } from '../core/dto'

@ApiTags('country')
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post('add')
  @ApiOperation({ summary: 'Add country name or city' })
  @ApiBody({
    type: AddCountryDto,
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  addCountry(@Body() body: AddCountryDto) {
    return this.countryService.addCountry(body)
  }
}
