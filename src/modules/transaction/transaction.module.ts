import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExchangeRateModule } from '@infra/exchange-rate'
import { TransactionController } from './actions'
import { TransactionService } from './services'
import { Transaction, FinancialRecord } from './core/entity'
import { Country } from '@modules/country/core/entity'

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, FinancialRecord, Country]), ExchangeRateModule],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
