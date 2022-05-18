import React from "react";
import classNames from 'classnames';

import "components/Button.scss";

export default function Button(props) {
   // console.log('PPP', props.onClick)
   let buttonClass = classNames('button', {
      'button--confirm': props.confirm,
      'button--danger': props.danger
   })

   // if props has trythy for onClick || disabled...
   return (
   <button className={buttonClass} 
   onClick={props.onClick} 
   disabled={props.disabled}>
      {props.children}
   </button>);
}
