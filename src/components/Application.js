import React, {useState, useEffect} from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import {getAppointmentsForDay } from "../helpers/selectors"
import { getInterview } from "../helpers/selectors";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Mila Kukoba",
//       interviewer: {
//         id: 2,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//     interview: {
//       student: "Shan Poul",
//       interviewer: {
//         id: 3,
//         name: "Mildred Nazirm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Antony Gates",
//       interviewer: {
//         id: 4,
//         name: "Cohana Roy",
//         avatar: "https://i.imgur.com/FK8V841.jpg",
//       }
//     }
//   },
//   {
//     id: 6,
//     time: "5pm",
//   },
//   {
//     id: 7,
//     time: "6pm",
//   }
// ];

export default function Application(props) {
  
  // const [day, setDay] = useState('Monday');
  // const [days, setDays] = useState([]);
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {}
  });

  
  const setDay = day => setState({ ...state, day });
  //const setDays = days => setState(prev => ({ ...prev, days }));
  
  // useEffect(() => {
    //   axios
    //   .get(`/api/days`)
    //   .then((response) => {
      //     console.log(response.data);
      //     //setDays([...response.data])
      //   })
      // }, [])
      
      useEffect(() => {
        Promise.all([
          axios.get(`/api/days`),
          axios.get(`/api/appointments`),
          axios.get(`/api/interviewers`)
        ]).then((all) => {
          //console.log(all[2].data)
          
          setState(prev => ({...prev, days:all[0].data, appointments: all[1].data, interviewers: all[2].data}))
        })
      }, [])
      
  const appointments = getAppointmentsForDay(state, state.day);
  console.log(state.interviewers);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
            <Appointment
              key={appointment.id}
              // {...appointment}
              id={appointment.id}
              time={appointment.time}
              interview={interview}
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
    setDay={setDay}/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {schedule}
      </section>
    </main>
  );
}
