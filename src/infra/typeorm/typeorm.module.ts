import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfigService } from './services'

@Module({
  imports: [
    NestTypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
  ],
})
export class TypeOrmModule {}
