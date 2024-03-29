import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@infra/typeorm'
import { ExchangeRateModule } from '@infra/exchange-rate'
import { TransactionModule } from '@modules/transaction'
import { LocationModule } from '@modules/location'
import { CurrencyModule } from '@modules/currency'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule,
    ExchangeRateModule,
    TransactionModule,
    LocationModule,
    CurrencyModule,
  ],
})
export class AppModule {}
