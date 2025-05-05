import {useImperativeHandle, forwardRef, useRef} from "react";
import {createPortal} from "react-dom";

const ResultModal = forwardRef(function ResultModal({result, targetTime, closing, remainingTime}, ref) {
    const dialog = useRef()

    const userLost = remainingTime <= 0;
    const formattedTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime/(targetTime * 1000))*100);

    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            },
            close(){
                dialog.current.close();
            },
        }
    });

    return createPortal(
        <dialog className="result-modal" ref={dialog}>
            <h2>You {userLost ? "lost" : "win"}</h2>
            <h2>Your Score: {score}</h2>
            <p>The target time was <strong>{targetTime} seconds</strong></p>
            <p>You stopped timer with <strong>{formattedTime} seconds left</strong></p>
            <form method="dialog">
                <button type="button" onClick={closing}>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")
    )
})

export  default ResultModal;