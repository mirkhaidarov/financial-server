import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ExchangeRateModule } from '@infra/exchange-rate'
import { ExceptionService } from '@core/modules/exception'
import { DefaultCurrency } from './core/entities'
import { CurrencyController } from './actions'
import { CurrencyService } from './services'

@Module({
  imports: [TypeOrmModule.forFeature([DefaultCurrency]), ExchangeRateModule],
  controllers: [CurrencyController],
  providers: [CurrencyService, ExceptionService],
})
export class CurrencyModule {}
