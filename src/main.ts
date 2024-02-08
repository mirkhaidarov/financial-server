import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { SWAGGER_PATH, SWAGGER_TITLE, SWAGGER_VERSION } from '@core/constants/swagger'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())
  const swaggerConfig = new DocumentBuilder().setTitle(SWAGGER_TITLE).setVersion(SWAGGER_VERSION).build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup(SWAGGER_PATH, app, swaggerDocument)
  await app.listen(3000)
}
bootstrap()
