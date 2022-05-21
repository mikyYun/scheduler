import React, {useState, useEffect} from "react"

import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList.jsx";
import Appointment from "./Appointment/index.js";
import { getAppointmentsForDay, getInterview } from "helpers/selectors.jsx";


export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  }, []);
  let dailyAppointments = [];

  const setDay = day => setState({...state, day});
  

// use spread syntax to update object state
// setState((prev) =>{day:prev.day, days:'newValue'})
// setState((prev) => ...prev, dyas:'newValue')

  useEffect(() => {
    console.log('update')
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
      .then((all) => {
        setState((prev) => (
          // console.log(prev), // init state
          // console.log('init responses',all[0].data), // init state
          // console.log('init responses',all[1].data), // init state
          // console.log('init responses',all[2].data), // init state
          { 
            ...prev,
            days:all[0].data,
            // days: setDays(all[0].data),
            // why setDays(all[0].data) didn't work??????????
            appointments:all[1].data,
            interviewers:all[2].data
          }));
      })
      .catch((err) => {
        console.log('GET api/days error', err)
      })
  }, [])

  // console.log('should be updated state', state)
  // console.log('test', getAppointmentsForDay(state, 'Tuesday'))

    // console.log(dailyAppointments)
    dailyAppointments = getAppointmentsForDay(state, state.day);

    const appointmentList = dailyAppointments.map((appointment) => {
      // console.log('appointment', appointment)
      const interview = getInterview(state, appointment.interview)
      // console.log(state) 
      // console.log(interview) // null OR object
      return (
        <Appointment
          key={appointment.id}
          {...appointment}
          interview={interview}
          // id={appointment.id}
          // time={appointment.time}
          // interview={appointment.interview}
        />
      )
    })
  
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentList}
      </section>
    </main>
  );
}
