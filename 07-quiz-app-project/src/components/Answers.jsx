import {useRef} from "react";

export default function Answers({answers, selectedAnswer, answerState, onSelect}){
    const shuffledAnswers = useRef();

    if(!shuffledAnswers.current){
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }


    return (
        <ul id="answers">
            {shuffledAnswers.current.map((answer) => {
                const isSelected = answer === selectedAnswer
                let cssButtonClass = '';

                if(isSelected && answerState === 'answered'){
                    cssButtonClass = 'selected';
                }
                if(isSelected && (answerState === "correct" || answerState === "wrong")) {
                    cssButtonClass = answerState;
                }
                return (
                    <li key={answer} className="answer">
                        <button onClick={() => onSelect(answer)} className={cssButtonClass} disabled={answerState !== ''}>
                            {answer}
                        </button>
                    </li>
                )
            })}
        </ul>
    )
}