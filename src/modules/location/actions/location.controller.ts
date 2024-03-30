import { Body, Controller, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { AddCountryDto, AddCityDto } from '../core/dto'
import { LocationService } from '../services'

@ApiTags('location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post('add/country')
  @ApiOperation({ summary: 'Add country' })
  @ApiBody({
    type: AddCountryDto,
  })
  addCountry(@Body() body: AddCountryDto) {
    return this.locationService.addCountry(body)
  }

  @Post('add/city')
  @ApiOperation({ summary: 'Add city' })
  @ApiBody({
    type: AddCityDto,
  })
  addCity(@Body() body: AddCityDto) {
    return this.locationService.addCity(body)
  }
}
