import React from 'react';

export function getAppointmentsForDay(state, day) {
  const result = []
  const matchingDay = state.days.filter((each) => each.name === day)
  if (matchingDay.length > 0) {
    const appointmentsID = matchingDay[0].appointments
    appointmentsID.forEach((each) => {
      result.push(state.appointments[each])
    })
  }
  return result
}
