import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

export function setupDayjs() {
  dayjs.extend(utc)
}
