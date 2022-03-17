import React from "react";
import "./App.scss"

const App = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [timeLeft, setTimeLeft] = React.useState(1500);
  const [timingType, setTimingtype] = React.useState("SESSION");
  const [play, setPlay] = React.useState(false);
  
  const handleBreakIncrease = () => {
    if(breakLength < 60){
      setBreakLength(breakLength + 1)
    }
  }
  
  const handleBreakDecrease = () => {
    if(breakLength > 1){
      setBreakLength(breakLength - 1)
    }
  }
  
   const handleSessionIncrease = () => {
    if(sessionLength < 60){
      setSessionLength(sessionLength + 1)
      setTimeLeft(timeLeft + 60)
    }
  }
  
  const handleSessionDecrease = () => {
    if(sessionLength > 1){
      setSessionLength(sessionLength - 1)
      setTimeLeft(timeLeft - 60)
    }
  }
  
  const handleReset = () => {
    clearTimeout();
    setPlay(false);
    setTimeLeft(1500);
    setBreakLength(5);
    setSessionLength(25);
    setTimingtype("SESSION");
    const audio = document.getElementById("beep");
    audio.pause()
    audio.currentTime = 0;
  }
  
  const handlePlay = () => {
    clearTimeout();
    setPlay(!play);
  }
  
  const resetTimer = () => {
    const audio = document.getElementById("beep");
    if(!timeLeft && timingType === "SESSION"){
      setTimeLeft(breakLength * 60)
      setTimingtype("BREAK")
      audio.play()
    }
    if(!timeLeft && timingType === "BREAK"){
      setTimeLeft(sessionLength * 60)
      setTimingtype("SESSION")
      audio.pause()
      audio.currentTime = 0;
    }
  }
  
  const clock = () => {
    if(play){  
      resetTimer()
    }else {
      clearTimeout()
    }
  }
  
  React.useEffect(() => {
   clock()
   let timeout = null
   if (timeLeft && play){
     timeout = setTimeout(() => {
      setTimeLeft(timeLeft - 1) 
    }, 1000);
   } return () => {
     clearTimeout(timeout)
   }
  })
 
  const timeFormatter = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  
  const title = timingType === "SESSION" ? "Session" : "Break";
  
  return (
   <div>
    <div className="wrapper">
      <h2>25 + 5 Clock</h2>
      <div className="break-session-length">
        <div>
          <h3 id="break-label">Break Length</h3>
          <div>
            <button disabled={play} onClick={handleBreakDecrease} id="break-decrement">↓</button>
              <strong id="break-length">{breakLength}</strong>
            <button disabled={play} onClick={handleBreakIncrease} id="break-increment">↑</button>             
          </div>
         </div>
         <div>
           <h3 id="session-label">Session Length</h3>
           <div>
            <button disabled={play} onClick={handleSessionDecrease} id="session-decrement">↓</button>           
              <strong id="session-length">{sessionLength}</strong>
            <button disabled={play} onClick={handleSessionIncrease} id="session-increment">↑</button>
          </div>
         </div>
      </div>
      <div className="timer-wrapper">
        <div className="timer">
           <h2 id="timer-label">{title}</h2>
           <h3 id="time-left">{timeFormatter()}</h3>
        </div>
        <button onClick={handlePlay} id="start_stop">⏵︎⏸︎</button>
        <button className="reset" onClick={handleReset} id="reset">再</button>
      </div>
      <div className="twistie">Twistie Best Girl</div>
    </div>
    <audio
      id="beep" 
      preload="auto"
      src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
    />
    </div>);
}

export default App
