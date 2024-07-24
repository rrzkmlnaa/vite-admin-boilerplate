export const getDaysInMonth = (month: number, year: number): string[] => {
  const date = new Date(year, month, 1)
  const days = []
  const options = { weekday: 'short' } as const
  while (date.getMonth() === month) {
    const dayNumber = date.getDate()
    const dayName = new Intl.DateTimeFormat('en-US', options).format(date)
    days.push(`${dayNumber} ${dayName}`)
    date.setDate(date.getDate() + 1)
  }
  return days
}

export const getDaysInWeeks = (
  startMonth: number,
  startYear: number,
  endMonth: number,
  endYear: number
): string[][] => {
  const startDate = new Date(startYear, startMonth, 1)
  const endDate = new Date(endYear, endMonth + 1, 0) // End of the endMonth
  const weeks: string[][] = []
  let week: string[] = []
  const options = { weekday: 'short' } as const

  // Initialize date to the start date
  const currentDate = new Date(startDate)

  // Move the date to the first day of the week (Sunday)
  while (currentDate.getDay() !== 0) {
    currentDate.setDate(currentDate.getDate() - 1)
  }

  while (currentDate <= endDate) {
    const dayNumber = currentDate.getDate()
    const monthName = new Intl.DateTimeFormat('en-US', {
      month: 'long'
    }).format(currentDate)
    const dayName = new Intl.DateTimeFormat('en-US', options).format(
      currentDate
    )
    week.push(`${monthName} ${dayNumber} ${dayName}`)

    if (currentDate.getDay() === 6) {
      weeks.push(week)
      week = []
    }

    currentDate.setDate(currentDate.getDate() + 1)
  }

  // Push the last week if it has any days in it
  if (week.length > 0) {
    weeks.push(week)
  }

  return weeks
}

export const getDaysInCurrentWeek = (): string[] => {
  const currentDate = new Date()
  const weeks: string[] = []
  const options = { weekday: 'short' } as const

  // Move the date to the first day of the week (Sunday)
  while (currentDate.getDay() !== 0) {
    currentDate.setDate(currentDate.getDate() - 1)
  }

  // Get days for the current week
  for (let i = 0; i < 7; i++) {
    const dayNumber = currentDate.getDate()
    const monthName = new Intl.DateTimeFormat('en-US', {
      month: 'long'
    }).format(currentDate)
    const dayName = new Intl.DateTimeFormat('en-US', options).format(
      currentDate
    )
    weeks.push(`${monthName} ${dayNumber} ${dayName}`)
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return weeks
}

export function getMonthFromDate(date: Date): number {
  return date.getMonth() + 1
}

export function getMonthName(month: number): string {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  if (month < 1 || month > 12) {
    throw new Error('Month must be between 1 and 12')
  }

  return monthNames[month - 1]
}
