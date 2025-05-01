import { useState } from "react";

export default function Player({name, symbol, isActive, onChangeName}) 
{
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(name)

    let playerName =  <span className="player-name">{newName}</span>;

    function handleChange(event) {
        setNewName(event.target.value);
    }

    if(isEditing) {
        playerName = <input type="text" required placeholder={newName} onChange={handleChange}/>;
    }


    return (
    <li className={isActive ? 'active' : undefined}>
        <span className="player">
            {playerName}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={() => {
                
                setIsEditing((editing) => !editing)
                if(isEditing) {onChangeName(newName, symbol);}
              
            }}>{isEditing ?  "Save" : "Edit"}</button>
    </li>
      );
}