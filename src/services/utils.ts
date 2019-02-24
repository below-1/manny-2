import { SimpleTime } from '../types'
import moment from 'moment'

export const toDateRange = (time: SimpleTime) => {
  let start, end, unit

  console.log(time)

  switch (time) {
    case SimpleTime.TODAY:
      unit = 'day'
      break
    case SimpleTime.THIS_WEEK:
      unit = 'week'
      break
    case SimpleTime.THIS_MONTH:
      unit = 'month'
      break
    case SimpleTime.THIS_YEAR:
      unit = 'year'
      break
    default:
      throw new Error('Simple Time value is not recognized: ' + time)
  }

  start = moment().startOf(unit).toDate()
  end = moment().endOf(unit).toDate()
  return { start, end }
}