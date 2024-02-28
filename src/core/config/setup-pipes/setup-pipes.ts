import type { NestFastifyApplication } from '@nestjs/platform-fastify'
import { StringToBooleanPipe } from './string-to-boolean'

export function setupPipes(app: NestFastifyApplication) {
  app.useGlobalPipes(new StringToBooleanPipe())
}
