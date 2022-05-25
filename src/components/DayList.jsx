import React from "react";
import DayListItem from "./DayListItem.jsx";

export default function DayList(props) {
  // console.log('DAYLIST')
  const DayListMap = props.days.map((each) => {
    return (
      <DayListItem
        key={each.id}
        name={each.name}
        spots={each.spots}
        selected={each.name === props.day}
        setDay={props.setDay}
      />
    );
  });

  return <ul>{DayListMap}</ul>;
}
