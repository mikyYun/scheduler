import React from "react";
import InterviewerListItem from "./InterviewerListItem.jsx";
import "components/InterviewerList.scss";
import PropTypes from "prop-types";

export default function InterviewerList(props) {
  // console.log('INTERVIEWERLISTS')

  const Interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={() => props.onChange(interviewer.id)}
        selected={props.value === interviewer.id} // if props.value is not exist, -> selected is always false
      />
    );
  });
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{Interviewers}</ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};
