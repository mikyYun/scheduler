import React from 'react';
import './styles.scss'
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';

export default function Appointment(props) {
  console.log('indexPROPS', props.interview)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const {mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )

  // props.interviewers = [];

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {/* {props.interview &&  */}
      {mode === SHOW && (
        <Show 
          student={props.interview.student}
          interviewer={props.interview.interviewer}/>
      )}
      {mode === CREATE && <Form interviewers={[]} onCancel={back}/>}
    </article>
  );
}