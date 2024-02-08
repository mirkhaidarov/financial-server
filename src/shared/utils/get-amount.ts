import { isNumber } from './is-number'

type Args = {
  amount: string | number
  recordAmount?: string | number | null
}

export function getAmount({ amount, recordAmount }: Args) {
  if (!isNumber(amount)) {
    throw new Error(`An amount type not a number, the value is: "${typeof amount}" and equal "${amount}"`)
  }

  let result = Number(recordAmount)

  if (!isNumber(recordAmount)) {
    result = 0
  }

  return result + Number(amount)
}
