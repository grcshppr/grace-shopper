export const prettyDollar = aNum => {
  return '$' + aNum.toString().slice(0, -2) + '.' + aNum.toString().slice(-2)
}

export const prettyDate = aDate => {
  const monthNames = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ]
  let day = ''
  let monthIndex = 0
  const startDay = aDate.slice(8, 10)
  if (startDay.slice(0, 1) === '0') {
    day = startDay.slice(1)
  } else {
    day = startDay
  }
  const startMonth = aDate.slice(5, 7)
  if (startMonth.slice(0, 1) === '0') {
    monthIndex = Number(startMonth.slice(1))
  }
  const year = aDate.slice(0, 4)

  return day + ' ' + monthNames[monthIndex] + ' ' + year
}
