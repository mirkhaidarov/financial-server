import { Repository } from 'typeorm'
import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../core/entity'
import { CreateUserDto } from '../core/dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(body: CreateUserDto) {
    try {
      this.userRepository.save(body)

      return { status: HttpStatus.CREATED, description: 'Success' }
    } catch (error) {
      console.error(`Error inside UserService in createUser method. \n${error}`)
    }
  }
}
