import { Body, Controller, HttpStatus, Post, Put } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
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
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  createCountry(@Body() body: AddCountryDto) {
    return this.locationService.addCountry(body)
  }

  @Put('add/city')
  @ApiOperation({ summary: 'Add city' })
  @ApiBody({
    type: AddCityDto,
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  createCity(@Body() body: AddCityDto) {
    return this.locationService.addCity(body)
  }
}
