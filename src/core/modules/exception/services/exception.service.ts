import {
  Injectable,
  NotFoundException,
  HttpStatus,
  InternalServerErrorException,
  HttpExceptionOptions,
} from '@nestjs/common'

type SuccessArgs<DataType> = {
  message: string
  data?: Record<string, DataType>
  status?: HttpStatus
}

type SuccessResponse<DataType> = {
  message: string
  data?: Record<string, DataType>
  status: HttpStatus
}

@Injectable()
export class ExceptionService {
  notFound<ErrorType>(
    objectOrError?: ErrorType,
    descriptionOrOptions?: string | HttpExceptionOptions,
  ): NotFoundException {
    return new NotFoundException(objectOrError, descriptionOrOptions)
  }

  internalServerError<ErrorType>(
    objectOrError?: ErrorType,
    descriptionOrOptions?: string | HttpExceptionOptions,
  ): InternalServerErrorException {
    return new InternalServerErrorException(objectOrError, descriptionOrOptions)
  }

  success<DataType>({ message, data, status }: SuccessArgs<DataType>): SuccessResponse<DataType> {
    return { message, data, status: status || HttpStatus.OK }
  }
}
