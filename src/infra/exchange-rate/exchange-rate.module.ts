import { Module } from '@nestjs/common'
import { ExceptionService } from '@core/modules/exception'
import { ExchangeRateController } from './actions'
import { ExchangeRateService } from './services'

@Module({
  controllers: [ExchangeRateController],
  providers: [ExchangeRateService, ExceptionService],
  exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
