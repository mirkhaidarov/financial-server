import type { NestFastifyApplication } from '@nestjs/platform-fastify'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SWAGGER_PATH, SWAGGER_TITLE, SWAGGER_VERSION } from '@core/constants/swagger'

export function setupSwagger(app: NestFastifyApplication) {
  const swaggerConfig = new DocumentBuilder().setTitle(SWAGGER_TITLE).setVersion(SWAGGER_VERSION).build()
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)

  SwaggerModule.setup(SWAGGER_PATH, app, swaggerDocument)
}
