import {useState, useRef} from "react";

export default function Player() {
    let playerName = useRef()
    const [name, setName] = useState("unknown entity")

    function handleClick() {
        setName(playerName.current.value);
        playerName.current.value = "";
    }



    return (
        <section id="player">
            <h2>Welcome {name}</h2>
            <p>
                <input ref={playerName} type="text" placeholder="Enter your name"/>
                <button onClick={handleClick}>Set Name</button>
            </p>
        </section>
    );
}
