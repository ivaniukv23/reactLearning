import Input from "./Input.jsx";
import {useRef} from "react";
import Modal from "./Modal.jsx";

export default function NewProject({onAdd, cancelAdd}) {
    const titleRef = useRef();
    const descripRef = useRef();
    const dueDateRef = useRef();

    const modalRef = useRef();

    function handleSave() {
        const enteredTitle = titleRef.current.value;
        const enteredDescription = descripRef.current.value;
        const enteredDueDate = dueDateRef.current.value;

        if(enteredTitle.trim() === '' ||
            enteredDescription.trim() === '' ||
            enteredDueDate.trim()=== '')
        {
            modalRef.current.open();
            return;
        }

        onAdd({
            title: enteredTitle,
            description: enteredDescription,
            dueDate: enteredDueDate,
            tasks: []
        });
    }

    return (
        <>
            <Modal ref={modalRef} buttonCaption="Close">
                <h2 className="text-xl font-bold text-stone-500 my-4" >Invalid Input</h2>
                <p className="text-stone-700 mb-4">Oops...</p>
                <p className="text-stone-700 mb-4">Please make sure you provide a valid value for every input field</p>
            </Modal>
            <div className="w-[35rem] mt-16 ">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li><button onClick={cancelAdd} className="text-stone-800 hover:text-stone-950">Cancel</button></li>
                    <li><button onClick={handleSave} className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Save</button></li>
                </menu>
                <div>
                    <Input type="text" ref={titleRef} label="Title"/>
                    <Input ref={descripRef} label="Description" textarea/>
                    <Input type="date" ref={dueDateRef} label="Due Date"/>
                </div>
            </div>
        </>
    );
}