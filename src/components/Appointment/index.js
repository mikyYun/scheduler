import React from 'react';
import './styles.scss'
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';

export default function Appointment(props) {
  // console.log('indexPROPS', props)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const {mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  // props.interviewers = [arr];
  function save(name, interviewer) {
    const interview ={
      student: name,
      interviewer: interviewer
    };
    setTimeout(() => transition(SHOW), 1000)
    transition(SAVING)
    props.bookInterview(props.id, interview); // invoke here -> click save button
    // transition(SHOW)
  }

  const deleteAppointment = function(name, interviewer) {
    // console.log('deleting appintment')
    const interview = {
      student: name,
      interviewer: interviewer
    };
    setTimeout(() => transition(EMPTY), 800)
    transition(DELETING)

    props.cancelInterview(props.id, interview)
  }

  function confirmDelete () {
    transition(CONFIRM)
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && (
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
          // onEdit={'test'}
          // onDelete={deleteAppointment}
        />
      )}
      {mode === CREATE && <Form 
        interviewers={props.interviewers} 
        onCancel={back} 
        onSave={save} 
      />}
      {mode === SAVING && <Status message={mode}/>}
      {mode === DELETING && <Status message={mode}/>}
      {mode === CONFIRM && <Confirm 
        onCancel={back}
        onConfirm={() => deleteAppointment}
        // when should pass just a function / anonymous ??
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />}
      
    </article>
  );
}