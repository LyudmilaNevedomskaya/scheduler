export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDay = state.days.filter((days) => days.name === day)

  const appointments = filteredDay.map((item) => item.appointments)

  let result = []
  if (appointments.length > 0) {
    for (let i = 0; i < appointments[0].length; i++) {
      if (state.appointments[appointments[0][i]]) {
        result.push(state.appointments[appointments[0][i]])
      }
    }
  }
  //console.log(result);
  return result
}

export function getInterview(state, interview) {
  //console.log(state);
  //console.log(interview);
  let result = {}

  if (!interview) {
    return null
  }

  for (let int in state.interviewers) {
    if (state.interviewers[int].id === interview.interviewer) {
      result.student = interview.student
      result.interviewer = state.interviewers[int]

      //console.log(result);
    }
  }
  return result
}

export function getInterviewersForDay(state, day) {
  const filteredDay = state.days.filter((days) => days.name === day)
  const appointments = filteredDay.map((item) => item.interviewers)
  //console.log(appointments);

  let result = []
  if (appointments.length > 0) {
    for (let i = 0; i < appointments[0].length; i++) {
      if (state.interviewers[appointments[0][i]]) {
        result.push(state.interviewers[appointments[0][i]])
      }
    }
  }
  //console.log(result);
  return result;
  
}

