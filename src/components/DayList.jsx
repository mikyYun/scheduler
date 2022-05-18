import React from "react";
import DayListItem from "./DayListItem.jsx";

export default function DayList(props) {
  const DayListMap = props.days.map((each) => {
      // console.log(each.id)
      return (
        <DayListItem
          key={each.id}
          name={each.name}
          spots={each.spots}
          selected={each.name === props.value}
          setDay={props.onChange}
        />
      )
    });
  
  return (
    <ul>
      {DayListMap}
    </ul>
  );
}