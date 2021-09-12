import React, {useState} from 'react';


import InterviewerList from 'components/InterviewerList';

import Button from 'components/Button';

export default function Form (props) {
  
    const [name, setName] = useState(props.name || "")
    const [interviewer, setInterviewer] = useState(props.interviewer || null)
    const [error, setError] = useState("");

  const reset = function () {

      setName("")
      setInterviewer(null);
  }

  const cancel = function () {
    reset()
     props.onCancel();
  }
  const save = function () {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    } else if (interviewer === null) {
      setError("An interviewer must be selected")
      return;
    }
    //console.log('FORM onSave');
    setError("");
    props.onSave(name, interviewer)
  }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input 
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
            /*
              This must be a controlled component
            */
          />
        </form>
        <section className="appointment__validation">{error}</section>

        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={save} confirm>Save</Button>
        </section>
      </section>
    </main>
  );
}