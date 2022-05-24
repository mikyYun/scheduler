import React, {useState, useEffect} from "react"

import axios from "axios";

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
    // dailyAppointments
  } = useApplicationData()
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);

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
