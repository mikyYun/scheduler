import React from 'react';
import InterviewerListItem from './InterviewerListItem.jsx';
import 'components/InterviewerList.scss'

export default function InterviewerList(props) {
  console.log('InterviewerListPROPS',props)
  const Interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer = {() => props.onChange(interviewer.id)}
        selected = {props.value === interviewer.id}
        
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