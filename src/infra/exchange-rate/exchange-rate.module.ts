import { Module } from '@nestjs/common'
import { ExchangeRateController } from './actions/exchange-rate.controller'
import { ExchangeRateService } from './services/exchange-rate.service'

@Module({
  controllers: [ExchangeRateController],
  providers: [ExchangeRateService],
  exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
