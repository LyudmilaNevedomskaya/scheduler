import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useApplicationData(props) {


  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: {},
  })

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

  const setDay = (day) =>
    setState({
      ...state,
      day,
    })

  let dayNum;
  if (state.day === 'Monday') dayNum = 0;
  if (state.day === 'Tuesday') dayNum = 1;
  if (state.day === 'Wednesday') dayNum = 2;
  if (state.day === 'Thursday') dayNum = 3;
  if (state.day === 'Friday') dayNum = 4;

  function bookInterview(id, interview) {
    // console.log('book interview', id)
    // let day = state.days[dayNum]
    // console.log('day', day)
    // let spots = state.days[dayNum].spots
    // console.log('spots', spots)
    // if (!state.appointments[id].interview) {
    //   spots--
    //   console.log('spots inside if', spots)
    // }
    // day.spots = spots

    // const days = [...state.days]
    // console.log('days', days)
    // days[dayNum] = day

    const appointment = {
      ...state.appointments[id],
      interview: {
        ...interview,
      },
    }
    console.log('appointment', appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    }
    console.log('appoint', appointments);
    //console.log(id, interview)
    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments })
      //return res
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
