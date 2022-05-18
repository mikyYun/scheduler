import React from "react";
import classNames from "classnames";
import 'components/InterviewerListItem.scss'

// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };

export default function InterviewerListItem(props) {
  console.log('INTERVIEWERLISTITEMPROPS', props)
  const interviewerClassName = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  })

  return (
    <li className={interviewerClassName} onClick={props.setInterviewer && props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}