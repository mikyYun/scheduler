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
  // const result = interview
  // console.log(result)
  // result.interviewer = state.interviewers[interview.interviewer]
  // return result;
  return {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  }
};

// state = {
//   day: "Monday",
// days: [],
// appointments: {},
// interviewers: {}
// }


// expect.objectContaining({
//   student: expect.any(String),
//   interviewer: expect.objectContaining({
//     id: expect.any(Number),
//     name: expect.any(String),
//     avatar: expect.any(String)
//   })