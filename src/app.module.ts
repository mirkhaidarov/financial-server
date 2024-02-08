import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@infra/typeorm'
import { ExchangeRateModule } from '@infra/exchange-rate'
import { TransactionModule } from '@modules/transaction'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule,
    ExchangeRateModule,
    TransactionModule,
  ],
})
export class AppModule {}
