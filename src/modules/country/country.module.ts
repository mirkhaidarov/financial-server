import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CountryController } from './actions'
import { CountryService } from './services'
import { Country } from './core/entity'
import { FinancialRecord, Transaction } from '@modules/transaction/core/entity'

@Module({
  imports: [TypeOrmModule.forFeature([Country, FinancialRecord, Transaction])],
  controllers: [CountryController],
  providers: [CountryService],
  exports: [CountryService],
})
export class CountryModule {}
