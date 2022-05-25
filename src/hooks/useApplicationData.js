import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_SPOTS = "SET_SPOTS"

function reducer(state, action) {
  // console.log('',action)
  switch(action.type) {
    case SET_DAY:
      return { ...state, day: action.value }
    
    case SET_INTERVIEW:
      return {
        ...state,
        days: action.value.days,
        appointments: action.value.appointments
      }

    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.value.days,
        appointments: action.value.appointments,
        interviewers: action.value.interviewers
      }
    
    case SET_SPOTS:
      return {
        
      }

    }
}

export default function useApplicationData() {
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // }, []);

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  // action = {type: SET_DAY, value: day}
  // dispatch(action) -> action = {something}
  // in reducer function, call by action.objectKey
  const setDay = day => dispatch({type: SET_DAY, value: day});

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
        dispatch({
          type: SET_APPLICATION_DATA,
          value: { 
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data
          }
        });
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
      .then(() => dispatch({type: SET_INTERVIEW, value: {appointments, days: getNewSpots(state, appointments)}}))
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
      .then(() => dispatch({type: SET_INTERVIEW, value: {appointments, days: getNewSpots(state, appointments)}}))
  }
  return { state, setDay, bookInterview, cancelInterview };
}