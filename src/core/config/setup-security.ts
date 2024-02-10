import helmet from '@fastify/helmet'
import type { NestFastifyApplication } from '@nestjs/platform-fastify'

export function setupSecurity(app: NestFastifyApplication) {
  app.register(helmet)
}
