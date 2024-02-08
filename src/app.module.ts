import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@infra/typeorm'
import { ExchangeRateModule } from '@infra/exchange-rate'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule,
    ExchangeRateModule,
  ],
})
export class AppModule {}
