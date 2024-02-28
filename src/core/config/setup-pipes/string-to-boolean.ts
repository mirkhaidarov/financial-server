import { PipeTransform, Injectable } from '@nestjs/common'

@Injectable()
export class StringToBooleanPipe implements PipeTransform {
  transform(value: unknown): string | boolean | unknown {
    if (typeof value !== 'string') {
      return value
    }

    const lowercaseValue = value.toLowerCase()

    if (lowercaseValue === 'true') {
      return true
    } else if (lowercaseValue === 'false') {
      return false
    } else {
      return value
    }
  }
}
