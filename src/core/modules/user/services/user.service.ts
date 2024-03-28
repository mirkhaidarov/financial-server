import { Repository } from 'typeorm'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../core/entity'
import { CreateUserDto } from '../core/dto'
import { ExceptionService } from '@core/modules/exception'

@Injectable()
export class UserService {
  constructor(
    private readonly exceptionService: ExceptionService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(body: CreateUserDto) {
    try {
      this.userRepository.save(body)

      return { status: HttpStatus.CREATED, description: 'Success' }
    } catch (error: unknown) {
      this.exceptionService.internalServerError(error)
    }
  }
}
