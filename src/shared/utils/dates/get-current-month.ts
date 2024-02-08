export function getCurrentMonth(
  locales: Intl.LocalesArgument = 'en-US',
  options: Intl.DateTimeFormatOptions = { month: 'long' },
) {
  return new Date().toLocaleString(locales, options)
}
