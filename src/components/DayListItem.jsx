import React from 'react';
import "components/DayListItem.scss";
import classNames from 'classnames';

export default function DayListItem(props) {
  // console.log('daylistitem', props)
  
  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': props.spots === 0 
  })
  function formatSpots() {
    if (props.spots === 0) {
      return 'no spots'
    } else if (props.spots === 1) {
      return '1 spot'      
    }
    return props.spots + ' spots'
  }

  return (
    // invoke function'liProps' conditional 
    // <li {...liProps}> // manipulating / distructuring = ...
    
    <li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className='text--regular'>
        {props.name}
      </h2>
      <h3 className='text--light' >
        {formatSpots()} remaining 
      </h3>
    </li>
  );
}


