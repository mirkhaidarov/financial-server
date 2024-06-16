import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FinancialRecord, Transaction } from '@modules/transaction/core/entity'
import { City, Country } from './core/entity'
import { ExceptionService } from '@core/modules/exception'
import { LocationController } from './actions'
import { LocationService } from './services'

@Module({
  imports: [TypeOrmModule.forFeature([City, Country, FinancialRecord, Transaction])],
  controllers: [LocationController],
  providers: [LocationService, ExceptionService],
  exports: [LocationService],
})
export class LocationModule {}
