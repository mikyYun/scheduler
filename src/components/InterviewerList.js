import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import 'components/InterviewerList.scss'

export default function InterviewerList(props) {
  console.log('PROPS',props.interviewer)
  const Interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        id = {interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer = {props.setInterviewer}
        selected = {props.interviewer === interviewer.id}
      />
    )
  })
  return (
    <section className="interviewers">
  <h4 className="interviewers__header text--light">Interviewer</h4>
  <ul className="interviewers__list">
    {Interviewers}
  </ul>
</section>
  );
}