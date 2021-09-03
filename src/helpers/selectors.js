export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const filteredDay = state.days.filter((days) => days.name === day);
  
  const appointments = filteredDay.map(item => item.appointments)
  
  let result = []
  if (appointments.length > 0) {

    for (let i = 0; i < appointments[0].length; i++) {
        if (state.appointments[appointments[0][i]]) {
          result.push(state.appointments[appointments[0][i]])
        }
      }
  }
  return result;
}