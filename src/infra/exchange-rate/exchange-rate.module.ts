import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DefaultCurrency } from './core/entities'
import { ExchangeRateController } from './actions/exchange-rate.controller'
import { ExchangeRateService } from './services/exchange-rate.service'

@Module({
  imports: [TypeOrmModule.forFeature([DefaultCurrency])],
  controllers: [ExchangeRateController],
  providers: [ExchangeRateService],
  exports: [ExchangeRateService],
})
export class ExchangeRateModule {}
