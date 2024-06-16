import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@infra/typeorm'
import { ExchangeRateModule } from '@infra/exchange-rate'
import { UserModule } from '@modules/user'
import { TransactionModule } from '@modules/transaction'
import { LocationModule } from '@modules/location'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule,
    ExchangeRateModule,
    UserModule,
    TransactionModule,
    LocationModule,
  ],
})
export class AppModule {}
