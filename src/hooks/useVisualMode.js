const { useState } = require("react")

const useVisualMode = function (initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (newMode, replace = false) {
    if(!replace) {
      setMode(newMode);
      //console.log('transitiion', mode);
      setHistory(prev => {
        return [...prev, newMode]})
    } else {
      setMode(newMode)
    }
  }
  
  const back = function() {
    if (history.length > 1) {
      history.pop()
      let last = history[history.length - 1];
      setMode(last)
    }
   
  }
  
  return { mode, transition, back};
}

export default useVisualMode;