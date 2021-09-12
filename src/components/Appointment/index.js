import React from 'react'

import useVisualMode from 'hooks/useVisualMode'

import 'components/Appointment/styles.scss'

import Header from './Header'

import Show from './Show'

import Empty from './Empty'
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'
import Error from './Error'

const EMPTY = 'EMPTY'
const SHOW = 'SHOW'
const CREATE = 'CREATE'
const SAVING = 'SAVING'
const DELETE = 'DELETE'
const CONFIRM = 'CONFIRM'
const EDIT = 'EDIT'
const ERROR_SAVE = 'ERROR_SAVE'
const ERROR_DELETE = 'ERROR_DELETE'
//const ERROR_SAVE = "We're sorry, something went wrong";
//const ERROR_DELETE = "We're sorry, something went wrong on our end";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY,
  )

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    }
    transition(SAVING);

    props.bookInterview(props.id, interview)
    //.then(() => transition(SHOW))
    .then((res) => {
      if (res) {
        transition(SHOW)
      } else {
        transition(ERROR_SAVE, true)
      }
    })
    .catch(error => transition(ERROR_SAVE, true))
  }

  function deleteAppointment() {
    transition(DELETE, true)
    props.cancelInterview(props.id)
    //.then(() => transition(EMPTY))
    .then((res) => {
      console.log('res', res);
      if (res) {
        transition(EMPTY)
      } else {
        transition(ERROR_DELETE, true)
      }
    })
    .catch(error => transition(ERROR_DELETE, true))
  }
  
  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty />} */}
      {mode === EMPTY && (
        <Empty
          bookInterview={props.bookInterview}
          onAdd={() => transition(CREATE)}
        />
      )}
      {mode === SHOW && (
        <Show
          //cancelInterview={props.cancelInterview}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
          bookInterview={props.bookInterview}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          //bookInterview={props.bookInterview}
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={'Saving'} />}
      {mode === DELETE && <Status message={'Deleting'} />}
      {mode === EDIT && (
        <Form
          id={props.id}
          onSave={save}
          onCancel={() => transition(SHOW)}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
          name={props.interview.student}
          edit={true}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={'Are you sure you would like to delete?'}
          onCancel={() => transition(SHOW)}
          onConfirm={deleteAppointment}
        />
      )}
      {mode === ERROR_SAVE && (<Error message={"We're sorry, something went wrong"} onClose={back} />)}
      {mode === ERROR_DELETE && (<Error message={"We're sorry, something went wrong"} onClose={back} />)}
    </article>
  )
}