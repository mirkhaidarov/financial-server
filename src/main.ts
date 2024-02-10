import { NestFactory } from '@nestjs/core'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { setupSecurity } from '@core/config/setup-security'
import { setupSwagger } from '@core/config/setup-swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

  setupSecurity(app)
  setupSwagger(app)

  await app.listen(3000)
}
bootstrap()
