import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }, []);

  const setDay = day => setState({ ...state, day });

  function updateSpots (state) {
    // console.log(state)
    // copy state and state.days.
    const newState = {...state};
    const newDays = [...state.days];
    // find current day in days
    const newDay = {...state.days.find((day) => day.name === state.day)};

    const findDay = newDays.find((day) => day.name === state.day)
    const appointmentIds = findDay.appointments;
    // const appointmentIds = newDay.appointments;
    const spots = appointmentIds.filter((appointmentId) => !state.appointments[appointmentId].interview).length
    // console.log('spots that interview is null', spots)

    newDay.spots = spots
    const newDayIndex = state.days.findIndex((day) => day.name === state.day)
    newDays[newDayIndex] = newDay

    newState.days = newDays
    
    return newState
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
    // console.log('id :',id, 'interview :', interview)
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
    return axios.put(`/api/appointments/${id}`, { interview: interview })
      .then(() => setState({
        ...state,
        ...updateSpots(state),///////////////////////////////////////////////////////
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
        ...updateSpots(state),/////////////////////////////////////////////////////////
        appointments: { ...appointments },

        })
      // console.log('first then',state)// not updated
      })
      // .then(() => {
        // function updateSpots (state) {
        //   console.log(state)
        //   // copy state and state.days.
        //   const newState = {...state};
        //   const newDays = [...state.days];
        //   // find current day in days
        //   const newDay = {...state.days.find((day) => day.name === state.day)};
      
        //   const findDay = newDays.find((day) => day.name === state.day)
        //   const appointmentIds = findDay.appointments;
        //   // const appointmentIds = newDay.appointments;
        //   const spots = appointmentIds.filter((appointmentId) => !state.appointments[appointmentId].interview).length
        //   console.log('spots that interview is null', spots)
      
        //   newDay.spots = spots
        //   const newDayIndex = state.days.findIndex((day) => day.name === state.day)
        //   newDays[newDayIndex] = newDay
      
        //   newState.days = newDays
          
        //   return newState
        // }
      //   // console.log(state) // next click update 'state' >> delete appointment
      //   const updatedState = updateSpots(state)
      //   console.log('bf',updatedState)
      //   setState(updatedState)
      //   console.log('aft',state)
      // });
  }
  return { state, setDay, bookInterview, cancelInterview };
}