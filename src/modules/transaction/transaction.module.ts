import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExchangeRateModule } from '@infra/exchange-rate'
import { TransactionController } from './actions'
import { TransactionService } from './services'
import { Transaction, FinancialRecord } from './core/entity'
import { Country } from '@modules/location/core/entity'
import { ExceptionService } from '@core/modules/exception'
import { User } from '@modules/user/core/entity'

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, FinancialRecord, Country, User]), ExchangeRateModule],
  controllers: [TransactionController],
  providers: [TransactionService, ExceptionService],
  exports: [TransactionService],
})
export class TransactionModule {}
