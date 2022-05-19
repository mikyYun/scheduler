import React, {useState} from 'react';
import Button from '../Button';
import InterviewerList from '../InterviewerList';
export default function Form (props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  console.log(interviewer) // 1

  function reset () {
    console.log("TEST")
    setStudent('')
    setInterviewer(null)
    console.log(interviewer)
  }
  
  function cancel () {
    reset()
    props.onCancel()
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off"
        onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
              your code goes here
            */
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList 
          /* your code goes here */
          interviewers={props.interviewers}
          value={interviewer}


          onChange={setInterviewer} // to use in lower
        
        
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger 
          onClick={cancel}>Cancel</Button>
          <Button confirm 
          onClick={() => props.onSave(student, interviewer)}
          >Save</Button>
        </section>
      </section>
    </main>
  );
}