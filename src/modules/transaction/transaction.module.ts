import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExchangeRateModule } from '@infra/exchange-rate'
import { TransactionController } from './actions'
import { TransactionService } from './services'
import { Transaction, FinancialRecord } from './core/entity'
import { Location } from '@modules/location/core/entity'
import { DefaultCurrency } from '@modules/currency/core/entities'

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, FinancialRecord, Location, DefaultCurrency]), ExchangeRateModule],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
