import React from 'react';

export function getAppointmentsForDay(state, day) {
  // console.log('HELPER_GETAPPOINTMENTS')
  const result = []
  const matchingDay = state.days.filter((each) => each.name === day)
  // console.log(matchingDay)
  if (matchingDay.length > 0) {
    const appointmentsID = matchingDay[0].appointments // appointmentIds
    appointmentsID.forEach((each) => {
      result.push(state.appointments[each])
    })
  }
  return result
  
};

export function getInterview(state, interview) {
  // console.log('HELPGER_GETINTERVIEW')
  if (interview === null) return null;

  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer],
  };

}

export function getInterviewersForDay (state, day) {
  // console.log('HELPER_GETINTERVIEWERS')
  const result = []
  const matchingDay = state.days.filter((each) => each.name === day)
  if (matchingDay.length > 0) {
    const interviewersID = matchingDay[0].interviewers
    interviewersID.forEach((each) => {
      result.push(state.interviewers[each])
    })
  }
  return result
};