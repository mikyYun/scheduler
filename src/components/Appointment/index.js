import React, { useEffect } from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';

export default function Appointment(props) {
  // console.log('indexPROPS', props)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // props.interviewers = [arr];
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer
    };

    transition(SAVING, true);
    props.bookInterview(props.id, interview) // invoke here -> click save button
      .then(() => { transition(SHOW); })
      .catch(() => { transition(ERROR_SAVE, true); });
  }

  const deleteAppointment = function (name, interviewer) {
    // console.log('deleting appintment')
    const interview = {
      student: name,
      interviewer: interviewer
    };
    // setTimeout cannot be sure the timing
    transition(DELETING, true);

    props.cancelInterview(props.id, interview)
      .then(() => { transition(EMPTY); })
      .catch(() => { transition(ERROR_SAVE, true); });
  };

  function confirmDelete() {
    transition(CONFIRM);
  }

  function onEdit() {
    transition(EDIT);
  }

  // if porps || mode || transition updated, check the interview and mode
  useEffect(() => {
    if (props.interview && mode === EMPTY) transition(SHOW);
    if (props.interview === null && mode === SHOW) transition(EMPTY);
  }, [props.interview, transition, mode]);


  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
          onEdit={onEdit}
        // onDelete={deleteAppointment}
        />
      )}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
      />}
      {mode === SAVING && <Status message={mode} />}
      {mode === DELETING && <Status message={mode} />}
      {mode === CONFIRM && <Confirm
        onCancel={back}
        onConfirm={() => deleteAppointment}
        // when should pass just a function / anonymous ??
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />}
      {mode === EDIT && <Form
        interviewers={props.interviewers}
        onCancel={back}
        onSave={save}
        student={props.interview.student}
        // interviewer={props.interview.interviewer.id} // edit form need interviewer id
        interviewer={props.interview.interviewer.id} // edit form need interviewer id
      />}
      {(mode === ERROR_DELETE || mode === ERROR_SAVE) && <Error message={mode} onClose={back} />}

    </article>
  );
}