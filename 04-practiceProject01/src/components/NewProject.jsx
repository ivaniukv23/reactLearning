import Input from "./Input.jsx";
import {useRef} from "react";

export default function NewProject({onAdd}) {
    const titleRef = useRef();
    const descripRef = useRef();
    const dueDateRef = useRef();

    function handleSave() {
        const enteredTitle = titleRef.current.value;
        const enteredDescription = descripRef.current.value;
        const enteredDueDate = dueDateRef.current.value;



        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate
        });
    }

    return (
        <div className="w-[35rem] mt-16 ">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li><button className="text-stone-800 hover:text-stone-950">Cancel</button></li>
                <li><button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button></li>
            </menu>
            <div>
                <Input type="text" ref={titleRef} label="Title"/>
                <Input ref={descripRef} label="Description" textarea/>
                <Input type="date" ref={dueDateRef} label="Due Date"/>
            </div>
        </div>
    );
}