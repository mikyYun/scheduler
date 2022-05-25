import React, { useState, useEffect } from "react";
import Button from "../Button";
import InterviewerList from "../InterviewerList";
export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // console.log(props)
  function reset() {
    // console.log("RESET")
    setStudent("");
    setInterviewer(null);
  }

  function cancel() {
    // console.log("CANCEL")
    reset();
    props.onCancel();
  }
  console.log('test', error)
  // useEffect(() => {
  //   if (student === "") {
  //     setError("Student name cannot be blank")
  //     return ;
  //   }
  //   if (interviewer === null) {
  //     setError("Please select an interviewer");
  //     return ;
  //   }
  //   props.onSave(student, interviewer)
  // }, [student, interviewer])
  function validate () {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return
    }
    props.onSave(student, interviewer);
  }

  // setError("new")
  console.log(error)
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">
          {error}
        </section>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          {/* fireEvent ("Save") */}
          <Button confirm onClick={validate}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
