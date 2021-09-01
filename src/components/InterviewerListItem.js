import React from "react";

import "components/InterviewerListItem.scss";

import classnames from "classnames";

export default function InterviewerListItem (props) {

  const formatName = function() {
    if (props.selected) {
      return props.name;
    }
  }

  const interviewerClass = classnames('interviewers__item', 'interviewers__item-image', {
    'interviewers__item--selected': props.selected,
  })
  const interviewerImage = classnames('interviewers__item-image', {
    'interviewers__item-image--selected': props.selected
  })


  return (
    <li key={props.id} className={interviewerClass}
       onClick={()=> props.setInterviewer(props.name)}
    >
      <img
        className={interviewerImage}
        src={props.avatar}
        alt={props.name}
      /> 
      {formatName(props)}
    </li>
  );
}