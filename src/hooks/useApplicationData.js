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
      //console.log(all[2].data)

      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }))
    })
  }, [])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {
        ...interview,
      },
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    }
    setState({ ...state, appointments })
    //console.log(id, interview)
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        return res
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
    return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        return setState({ ...state, appointments })
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
