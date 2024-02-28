import { NestFactory } from '@nestjs/core'
import { FastifyAdapter } from '@nestjs/platform-fastify'
import type { NestFastifyApplication } from '@nestjs/platform-fastify'
import { setupSecurity } from '@core/config/setup-security'
import { setupSwagger } from '@core/config/setup-swagger'
import { setupPipes } from '@core/config/setup-pipes'
import { AppModule } from './app.module'
import { setupDayjs } from '@core/config/setup-dayjs'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  setupSecurity(app)
  setupSwagger(app)
  setupPipes(app)
  setupDayjs()

  await app.listen(3000)
}
bootstrap()
