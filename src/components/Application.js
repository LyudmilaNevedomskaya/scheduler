import React from 'react';
import 'components/Application.scss'
import DayList from './DayList'
import Appointment from './Appointment'
import { getAppointmentsForDay } from '../helpers/selectors'
import { getInterview } from '../helpers/selectors'
import { getInterviewersForDay } from '../helpers/selectors'
import useApplicationData from 'hooks/useApplicationData'

export default function Application(props) {
  const { state, setDay, bookInterview, cancelInterview } = useApplicationData()

  const appointments = getAppointmentsForDay(state, state.day)
  //console.log(state.interviewers);
  const interviewers = getInterviewersForDay(state, state.day)
  // console.log(state.day);
  // console.log(interviewers);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)

    return (
      <Appointment
        key={appointment.id}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        // {...appointment}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
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
          <DayList days={state.days} day={state.day} setDay={setDay} />{' '}
        </nav>{' '}
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />{' '}
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}{' '}
      </section>{' '}
      <section className="schedule">
        {' '}
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}{' '}
        {schedule}{' '}
      </section>{' '}
    </main>
  )
}
