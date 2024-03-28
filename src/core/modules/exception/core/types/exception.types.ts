import type { HttpStatus } from '@nestjs/common'

export type SuccessArgs<DataType> = {
  message: string
  data?: DataType
  status?: HttpStatus
}

export type SuccessResponse<DataType> = {
  message: string
  data?: DataType
  status: HttpStatus
}
