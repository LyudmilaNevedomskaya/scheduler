import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  })

  const setDay = (day) =>
    setState({
      ...state,
      day,
    })
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
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      //console.log('state', state)

      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }))
    })
  }, [])

  function calculatingSpotsRemaining(days, appointment, incrementor) {
    const appointmentId = appointment.id
    const appointmentDay = days.find((element) => {
      return element.appointments.includes(appointmentId)
    })
    const spots = appointmentDay.spots;
    const spotsemaining = spots + incrementor;
    console.log('spotsRem', spotsemaining); 
    console.log('day', appointmentDay);
    return spotsemaining
  }

  function updateDays(days, appointment, incrementor) {
    const appointmentId = appointment.id
    const appointmentDay = days.find((element) => {
      return element.appointments.includes(appointmentId)
    })
    const dayID = appointmentDay.id
    const dayRemaining = calculatingSpotsRemaining(days, appointment, incrementor)
    const updatedDays = days.map((el) => {
      if (el.id === dayID) {
        el = {...el, spots: dayRemaining}
      }
      return el;
    })
    return updatedDays;
  }


  // const obj = {
  //   1: 5,
  //   2: 4,
  //   3: 4,
  //   4: 2,
  //   5: 1

  // }

  function bookInterview(id, interview) {
    // let dayNum
    // if (state.day === 'Monday') dayNum = 0
    // if (state.day === 'Tuesday') dayNum = 1
    // if (state.day === 'Wednesday') dayNum = 2
    // if (state.day === 'Thursday') dayNum = 3
    // if (state.day === 'Friday') dayNum = 4
    console.log('state', state)
    const appointment = {
      ...state.appointments[id],
      interview: {
        ...interview,
      },
    }
    console.log('APPOINTMENT', appointment);
    console.log('INTERVIEW', interview);
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    }

    //let day = state.days[dayNum]
    // let spots = state.days[dayNum].spots
    // if (!state.appointments[id].interview) {
    //   spots--
    // }
    //day.spots = spots

    const days = [...state.days]
    console.log('days', days)
    //days[dayNum] = day
    const updatedDays = updateDays(days, appointment, -1)
    //console.log('update days', test );

    //console.log(id, interview)
    return axios
    .put(`/api/appointments/${id}`, { interview })
    .then((res) => {
        setState({ ...state, appointments, days: updatedDays })
        //return res
      })
      .catch((error) => {
        console.log(error.response)
        return null
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    }
    const updatedDays = updateDays(state.days, appointment, 1)

    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        return setState({ ...state, appointments, days: updatedDays })
        //console.log(res);
        //return res;
      })
      .catch((error) => {
        console.log(error.response)
        return null
      })
  }
  return { state, setState, setDay, bookInterview, cancelInterview }
}
