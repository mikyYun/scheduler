import React, {useState} from 'react';

export default function useVisualMode (FIRST) {
  const [mode, setMode] = useState(FIRST);
  const [history, setHistory] = useState([FIRST])

  function transition (SECOND, replace = false) {
    setMode(SECOND);
    if (replace) {
      let historyCopy = [...history]
      historyCopy.splice(-1, 1, mode)
      setHistory(historyCopy)
    } else {
      setHistory((prev) => ([
        ...prev,
        SECOND
      ]))
    }
    // setMode(history[history.length - 1]);
    // why not Array.push() ????
  }

  function back () {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      let historyCopy = [...history]
      historyCopy.pop()
      setHistory(historyCopy)
    }
  }

  return {mode, transition, back};
}