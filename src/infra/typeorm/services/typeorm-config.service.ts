import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Environment } from '@core/types/environment.types'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService<Environment>) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('POSTGRES_HOST'),
      port: this.configService.get('POSTGRES_PORT'),
      username: this.configService.get('POSTGRES_USER'),
      password: this.configService.get('POSTGRES_PASSWORD'),
      database: this.configService.get('POSTGRES_DATABASE'),
      // never use TRUE in production
      synchronize: true,
      entities: ['dist/**/*.entity.ts'],
      autoLoadEntities: true,
      logging: false,
    }
  }
}
