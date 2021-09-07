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
const PROBLEM = 'PROBLEM'

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY,
  )

  function save(name, interviewer) {
    //console.log('save');
    const interview = {
      student: name,
      interviewer,
    }

    transition(SAVING)

    props.bookInterview(props.id, interview).then(() => transition(SHOW))
  }

  function deleteAppointment() {
    transition(DELETE)
    return props.cancelInterview(props.id).then(() => transition(EMPTY))

    //console.log('deleteAppoint',name);
    //props.cancelInterview(props.id, interview)
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
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form
          bookInterview={props.bookInterview}
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={'Saving'} />}
      {mode === DELETE && <Status message={'Deleting'} />}
      {mode === PROBLEM && <Error onClose={() => back} />}
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
    </article>
  )
}
