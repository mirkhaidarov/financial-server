import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExchangeRateService } from '@infra/exchange-rate'
import { ExceptionService } from '@core/modules/exception'
import { UserController } from './actions'
import { UserService } from './services'
import { User } from './core/entity'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, ExceptionService, ExchangeRateService],
  exports: [UserService],
})
export class UserModule {}
