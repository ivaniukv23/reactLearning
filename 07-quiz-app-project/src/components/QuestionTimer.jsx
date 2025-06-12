import { useState, useEffect, useRef } from "react";

export default function QuestionTimer({ timer, onTimeout, isAnswered }) {
    const [time, setTime] = useState(timer);

    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        timeoutRef.current = setTimeout(onTimeout, timer);

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, [timer, onTimeout, isAnswered]);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setTime((prev) => prev - 10);
        }, 10);

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [isAnswered]);

    // Эффект: если isAnswered стал "непустым", остановить таймер и интервал
    useEffect(() => {
        if (isAnswered) {
            clearTimeout(timeoutRef.current);
            clearInterval(intervalRef.current);
        }
    }, [isAnswered]);

    return <progress id="question-time" value={time} max={timer} />;
}
