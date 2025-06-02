import { use, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [name, setName] = useState(localStorage.getItem('name') ? localStorage.getItem('name') : '');
  const [timeLeft, setTimeLeft] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const motivational_phrases = ["No worries myboy", "Mentors is always ready to help you", "Every student is always ready to help you"
    , "You will pass Nfactorial Incubator 2025 successfully", "Try again, again and again", "You are stronger than you think"
    ,"Do it for your mom and dad", "The secret of success is not giving up", "Never say you can not do anything", "I believe in you"];
  const [motivationalPhrase, setMotivationalPhrase] = useState('');
  const [totalTimerEnd, setTotalTimerEnd] = useState(0);
  const [chosenTime, setChosenTime] = useState(timeLeft);
  const progress = (timeLeft / chosenTime) * 100

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  

  useEffect(() => {   
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((previous_sec) => {
        if (previous_sec == 1) {
          clearInterval(interval);
          setIsRunning(false);
          return false;
       }
      return previous_sec - 1;
    }); 
    }, 1000)

    return () => {
      setTotalTimerEnd((totalTimerEnd) => totalTimerEnd + 1)
      clearInterval(interval)}
  }, [isRunning])

  useEffect(() => {
    localStorage.setItem('name', name);
  }, [name]);

  useEffect(() => {
    const savedName = localStorage.getItem('name');
    if (savedName) setName(savedName);
  }, [])

  const handleStart = () => {
    setMotivationalPhrase(motivational_phrases[getRandomInt(10)]);
    setIsRunning(true);
    setTimeLeft(timeLeft);
  }

  const handleTimeDrop = () => {
    setTimeLeft(chosenTime);
    setIsRunning(false);
    setTotalTimerEnd((totalTimerEnd) => totalTimerEnd - 1)
  }
  
 const handleTryAgain = () => {
    setTimeLeft(chosenTime);
    setIsRunning(false);
  }

  return (
    <>
      <div className="card">
        <div>{motivationalPhrase}</div>
        <input type="text" placeholder='Your name' value={name} onChange={(e) => setName(e.target.value)}/>

        <hr />
        <br />
        <br />

        {isRunning && (
          <>
            <div>{name ? name : "Anonymus"}, осталось времени: {timeLeft ? timeLeft : 0}</div>
            <progress value={progress} max="100"></progress>
            <br />
          </>
        )}


        {!isRunning && timeLeft > 0 &&(
          <>
            <input type="number" placeholder="Chosen time" value={timeLeft} onChange={(e) => 
              {  
                const value = e.target.value;
                if (value === '') {
                  return;
                }
                setTimeLeft(Number(e.target.value)); 
                setChosenTime(Number(e.target.value))
                }}/>  
            <div>Выбранное время: {chosenTime}</div>
          </>
        )}

        {!isRunning && timeLeft > 0 && (
          <button onClick={handleStart}>Старт</button>
        )}

        
        
        {timeLeft == 0 && (<div>Ты справился, {name ? name : "Anonymus"} 💪</div>)}
        {!isRunning && timeLeft==0 && (
        <button onClick={handleTryAgain}>Попробовать еще раз</button>
        )}
        {isRunning && (
        <button onClick={handleTimeDrop}>Сброс</button>
        )}
        <br />
        <br />

        {timeLeft == 0 && (
          <div className='confetti-conteiner'>
            <span className='emoji'>⁉️</span>
            <span className='emoji'>💅</span>
            <span className='emoji'>🌈</span>
            <span className='emoji'>⁉️</span>
            <span className='emoji'>💅</span>
            <span className='emoji'>🌈</span>
            <span className='emoji'>⁉️</span>
            <span className='emoji'>💅</span>
            <span className='emoji'>🌈</span>
            <span className='emoji'>⁉️</span>
            <span className='emoji'>💅</span>
            <span className='emoji'>🌈</span>
          </div>
        )}

        <div>Вот столько раз вы завершали таймер: {totalTimerEnd}</div>
      </div>
    </>
  )
}

export default App
