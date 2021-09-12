import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  })
  const setDay = (day) =>
    setState({
      ...state,
      day,
    })
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

//UPDATING an available spots for interview//////////////////////////
  const updateSpots = (data) => {
    //console.log('DATA', data);
    let updatedDay = {}
    let counter = 0;
    
    for (let day of data.days) {
        if (day.name === data.day) {
            updatedDay = {...day}
            for (let i = 0; i < day.appointments.length; i++) {
                const dailyAppointment = day.appointments[i]
                if (data.appointments[dailyAppointment].interview === null) {
                    counter ++;
                }
            }
        }
    }
    const newDays = [...state.days];
    const day = {...newDays[updatedDay.id -1]}
    day.spots = counter;
    newDays[updatedDay.id - 1] = day;

    return newDays;
}
//ADDING NEW INTERVIEW///////////////////////////////////////
  function bookInterview(id, interview) {

    const appointment = {...state.appointments[id], interview: { ...interview } };
    const appointments = {...state.appointments, [id]: appointment };
    const newState = {...state, appointments };
    
    return axios.put(`/api/appointments/${id}`, {interview})
    .then((res) => {
        const days = updateSpots(newState);
          setState(prev => {
          return {...prev, appointments, days}
        })
        return res;
      })
      .catch((error) => {
        console.log(error.response)
        return null
      })
  }
// DELETING an existing interview//////////////////////////////////
  function cancelInterview(id) {
    const appointment = {...state.appointments[id], interview: null }
    const appointments = { ...state.appointments, [id]: appointment }
    const newState = {...state, appointments}
    
    return axios
    .delete(`/api/appointments/${id}`)
    .then((res) => {
        const days = updateSpots(newState);
        setState(prev => {
          return {...prev, appointments, days}
        })
        return res;
      })
      .catch((error) => {
        console.log(error.response)
        return null
      })
  }


  return { state, setState, setDay, bookInterview, cancelInterview }
}