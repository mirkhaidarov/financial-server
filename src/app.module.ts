import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@infra/typeorm'
import { ExchangeRateModule } from '@infra/exchange-rate'
import { TransactionModule } from '@modules/transaction'
import { CountryModule } from '@modules/country'
import { CurrencyModule } from '@modules/currency'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule,
    ExchangeRateModule,
    TransactionModule,
    CountryModule,
    CurrencyModule,
  ],
})
export class AppModule {}
