import dayjs, { type Dayjs } from 'dayjs'

export function getUTCDate(config?: string | number | Dayjs | Date, format?: string, strict?: boolean) {
  return dayjs.utc(config, format, strict)
}
