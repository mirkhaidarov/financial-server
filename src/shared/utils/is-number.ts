export function isNumber(value: unknown) {
  return (typeof value === 'number' || typeof value === 'string') && !Number.isNaN(Number(value))
}
