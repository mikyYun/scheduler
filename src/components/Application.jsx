import React from "react"

import "components/Application.scss";
import DayList from "./DayList.jsx";
import Appointment from "./Appointment/index.js";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.jsx";
import useApplicationData from "hooks/useApplicationData.js";

export default function Application() {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData()
  // console.log('state', state)
  const dailyAppointments = getAppointmentsForDay(state, state.day); // dayLists
  
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

  // console.log('days.spots', state.days)

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
        <Appointment key='last' time='5pm'/>
      </section>
    </main>
  );
}
