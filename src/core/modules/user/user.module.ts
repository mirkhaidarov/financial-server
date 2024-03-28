import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserController } from './actions'
import { UserService } from './services'
import { User } from './core/entity'
import { ExceptionService } from '../exception'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, ExceptionService],
  exports: [UserService],
})
export class UserModule {}
