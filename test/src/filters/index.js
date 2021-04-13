import timeFormat from '@/utils/timeFormat'

export function dateFormat(date) {
  if (!date) return ''
  return timeFormat(new Date(date), 'yyyy-MM-dd hh:mm:ss')
}

export function numhandle(num) {
  return Math.floor(Number(num) * 10) / 10 + '%'
}
