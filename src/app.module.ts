import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@infra/typeorm'
import { ExchangeRateModule } from '@infra/exchange-rate'
import { TransactionModule } from '@modules/transaction'
import { CountryModule } from '@modules/country'
import { UserModule } from '@core/modules/user'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule,
    UserModule,
    ExchangeRateModule,
    TransactionModule,
    CountryModule,
  ],
})
export class AppModule {}
