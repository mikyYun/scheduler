import React, {useState, useEffect} from 'react';
import axios from 'axios';
// import Appointment from 'components/Appointment';
// import { getAppointmentsForDay } from 'helpers/selectors';

export default function useApplicationData () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }, []);

  const setDay = day => setState({...state, day});
  
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
            days:all[0].data,
            appointments:all[1].data,
            interviewers:all[2].data
          }));
      })
      .catch((err) => {
        console.log('GET api/days error', err)
      })
  }, [])
  
  function bookInterview (id, interview) {
    // console.log('id :',id, 'interview :', interview)
    // creat new appointment obj with 'id'
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // create new appointments obj with 'id' and new created appointment obj

    const appointments = {
      ...state.appointments,
      [id]: {...appointment}
    };
    return axios.put(`/api/appointments/${id}`, {interview: interview})
    .then(() => setState({
      ...state,
      appointments:{...appointments}
    }))
  }

  function cancelInterview (id, interview) {
    console.log(id, interview)
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: {...appointment}
    };
    return axios.delete(`/api/appointments/${id}`)
    .then(() =>  setState({
      ...state,
      appointments:{...appointments}
    }))
  }
  return {state, setDay, bookInterview, cancelInterview}
}