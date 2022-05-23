import React, {useState, useEffect} from "react"

import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList.jsx";
import Appointment from "./Appointment/index.js";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.jsx";


export default function Application() {
  // console.log("APPLICATION")
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
            appointments:all[1].data,
            interviewers:all[2].data
          }));
      })
      .catch((err) => {
        console.log('GET api/days error', err)
      })
  }, [])
  
  // function bookInterview pass each Appointment component as props
  function bookInterview (id, interview) {
    // console.log('id :',id, 'interview :', interview)
    // creat new appointment obj with 'id'
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // console.log(appointment)
    // create new appointments obj with 'id' and new created appointment obj
    const appointments = {
      ...state.appointments,
      [id]: {...appointment}
    };
    // console.log(state)
    // console.log(appointments)
    // update state with new appointments obj
    setState({
      ...state,
      appointments:{...appointments}
    })
    // console.log(state)

    axios.put(`/api/appointments/:${id}`, {interview: interview})
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
    setState({
      ...state,
      appointments:{...appointments}
    })

  }

  dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointmentList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
