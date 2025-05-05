import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({title, targetTime}) {

    const [timeRemaining, setTimeRemainig] = useState(targetTime * 1000);

    const timer = useRef();
    const dialog = useRef();

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime*1000;
    if(timeRemaining <= 0) {
        clearInterval(timer.current);
        setTimeRemainig(targetTime * 1000);
        dialog.current.open();
    }

    function  handleStart() {
        timer.current = setInterval(()=>{
            setTimeRemainig(prevTimeRemainimg => prevTimeRemainimg - 10)
        }, 10);

    }

    function handleReset(){
        setTimeRemainig(targetTime * 1000);
        dialog.current.close();
    }

    function handleStop() {
        clearInterval(timer.current);
        dialog.current.open();
    }

    return (
        <>
            <ResultModal ref={dialog} remainingTime={timeRemaining} targetTime={targetTime} closing={handleReset}/>
            <section className="challenge">
                <h2>{title}</h2>
                <p className="challenge-time">
                    {targetTime} second{targetTime > 1 ? "s" : ""}
                </p>
                <p>
                    <button onClick={timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? "Stop" : "Start"} Challenge
                    </button>
                </p>
                <p className={timerIsActive ? "active" : undefined}>
                    {timerIsActive ? "Time is running..." : "Timer inactive"}
                </p>
            </section>
        </>

    )
}