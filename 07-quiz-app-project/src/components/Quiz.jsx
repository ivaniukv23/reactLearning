import {useState, useCallback, useRef} from "react";
import QUESTIONS from "../questions.js";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import Questions from "./Questions.jsx";
import Summary from "./Summary.jsx";
export default function Quiz() {


    const [answers, setAnswers] = useState([]);
    const activeQuestionIndex = answers.length ;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;




    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnswers(prevState => {
            return [...prevState, selectedAnswer];
        })
    }, []);

    const handleSkipAnswer = useCallback(()=>handleSelectAnswer(null), [handleSelectAnswer]);


    if(quizIsComplete) {
        return (
            <Summary selectedAnswers={answers}/>
        )
    }




    return (
        <div id="quiz">
            <Questions
                key={activeQuestionIndex}
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>

    )
}