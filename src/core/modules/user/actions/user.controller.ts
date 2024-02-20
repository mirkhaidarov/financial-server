import { Body, Controller, HttpStatus, Post } from '@nestjs/common'
import { UserService } from '../services'
import { CreateUserDto } from '../core/dto'
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger'

@Controller('user')
export class UserController {
  constructor(private readonly userServer: UserService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Success' })
  async createUser(@Body() body: CreateUserDto) {
    return this.userServer.createUser(body)
  }
}
