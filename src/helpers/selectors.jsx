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
};

export function getInterview(state, interview) {
  if (interview === null) return null;

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };

}

export function getInterviewersForDay (state, day) {
  const result = []
  const matchingDay = state.days.filter((each) => each.name === day)
  console.log(matchingDay[0])
  if (matchingDay.length > 0) {
    const interviewersID = matchingDay[0].interviewers
    interviewersID.forEach((each) => {
      result.push(state.interviewers[each])
    })
  }
  return result
};