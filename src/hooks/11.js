import React, { useState,useReducer, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }, []);

  const setDay = day => setState({ ...state, day });

  function getNewSpots (state, appointments) { // getNewSpots
    // spots < day < days


    // console.log(state)
    // copy state and state.days.
    const newState = {...state};
    const newDays = [...state.days];
    // find current day in days
    const newDay = {...state.days.find((day) => day.name === state.day)};

    const findDay = newDays.find((day) => day.name === state.day)
    const appointmentIds = findDay.appointments; 
    // console.log('test', appointmentIds)
    // should be filtered in updated appointments
    const spots = appointmentIds.filter((appointmentId) => !appointments[appointmentId].interview).length

    newDay.spots = spots
    const newDayIndex = state.days.findIndex((day) => day.name === state.day)
    newDays[newDayIndex] = newDay
    return newDays
  }

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
      .then((all) => {
        setState((prev) => (
          {
            ...prev,
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data
          }));
      })
      .catch((err) => {
        console.log('GET api/days error', err);
      });
  }, []);

  function bookInterview(id, interview) {
    // creat new appointment obj with 'id'
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // create new appointments obj with 'id' and new created appointment obj

    const appointments = {
      ...state.appointments,
      [id]: { ...appointment }
    };
    // console.log(getNewSpots(state, appointments))
    return axios.put(`/api/appointments/${id}`, { interview: interview })
      .then(() => setState({
        ...state,
        days: getNewSpots(state, appointments),
        appointments: { ...appointments }
      }))
  }
 

  function cancelInterview(id, interview) {
    // console.log(id, interview)
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: { ...appointment }
    };
    // console.log('before',appointments) // check after click, data deleted
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
        ...state,
        days: getNewSpots(state, appointments),/////////////////////////////////////////////////////////
        appointments: { ...appointments },

        })
      })
  }
  return { state, setDay, bookInterview, cancelInterview };
}