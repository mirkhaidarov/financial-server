import { Body, Controller, Patch, Post } from '@nestjs/common'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { UserService } from '../services'
import { AddUserDto, CurrencyDto } from '../core/dto'

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  @ApiOperation({ summary: 'Add user' })
  @ApiBody({
    type: AddUserDto,
  })
  async addUser(@Body() body: AddUserDto) {
    return this.userService.addUser(body)
  }

  @Patch('currency/update')
  @ApiOperation({ summary: 'Update user currency' })
  @ApiBody({
    type: CurrencyDto,
  })
  updateCurrency(@Body() { id, currency }: CurrencyDto) {
    return this.userService.updateCurrency({ id, currency: currency.toLowerCase() })
  }
}
