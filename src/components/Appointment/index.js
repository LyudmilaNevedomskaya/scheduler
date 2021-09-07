import React from 'react'

import useVisualMode from 'hooks/useVisualMode'

import 'components/Appointment/styles.scss'

import Header from './Header'

import Show from './Show'

import Empty from './Empty'
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'

const EMPTY = 'EMPTY'
const SHOW = 'SHOW'
const CREATE = 'CREATE'
const SAVING = 'SAVING'
const DELETE = 'DELETE';
const CONFIRM = 'CONFIRM';

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

    transition(SAVING);

    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  function deleteAppointment(name, interviewer) {
    const interview = null;
    //console.log('deleteAppoint',name);
    transition(CONFIRM)
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
          cancelInterview={props.cancelInterview}
          onDelete={deleteAppointment}
          bookInterview={props.bookInterview}
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}
        />
      )}
      {mode === CREATE && (
        <Form
          // name={props.name}
          // interviewer={props.interviewer}
          bookInterview={props.bookInterview}
          interviewers={props.interviewers}
          onCancel={() => back(EMPTY)}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={'Saving'} />}
      {mode === DELETE && <Status message={"Deleting"}/>}
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"}onCancel={() => transition(SHOW)} onConfirm={() => transition(EMPTY)}/>}
    </article>
  )
}
