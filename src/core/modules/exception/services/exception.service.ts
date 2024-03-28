import {
  Injectable,
  NotFoundException,
  HttpStatus,
  InternalServerErrorException,
  HttpExceptionOptions,
} from '@nestjs/common'
import type { SuccessArgs, SuccessResponse } from '../core/types'

@Injectable()
export class ExceptionService {
  notFound<ErrorType>(
    objectOrError?: ErrorType,
    descriptionOrOptions?: string | HttpExceptionOptions,
  ): NotFoundException {
    throw new NotFoundException(objectOrError, descriptionOrOptions)
  }

  internalServerError<ErrorType>(
    objectOrError?: ErrorType,
    descriptionOrOptions?: string | HttpExceptionOptions,
  ): InternalServerErrorException {
    throw new InternalServerErrorException(objectOrError, descriptionOrOptions)
  }

  success<DataType>({ message, data, status }: SuccessArgs<DataType>): SuccessResponse<DataType> {
    return { message, data, status: status || HttpStatus.OK }
  }
}
