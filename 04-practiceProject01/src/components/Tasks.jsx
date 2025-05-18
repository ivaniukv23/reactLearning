import {useState} from "react";

export default function Tasks({addTask, deleteTask, project}) {
    const [enteredTask, setEnteredTask] = useState('')

    function handleChange(event) {
        setEnteredTask(event.target.value);
    }

    function handleClick(id, enteredTask){

        if(enteredTask === ''){
            return;
        }

        addTask(id, enteredTask);
        setEnteredTask('');
    }


    return(
        <section>
            <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    className="w-64 px-2 py-1 rounded-sm bg-stone-200"
                    onChange={handleChange}
                    value={enteredTask}
                    placeholder="Enter new task"
                />
                <button onClick={() => handleClick(project.id, enteredTask)} className="text-stone-700 hover:text-stone-950">New task</button>
            </div>
            {project.tasks.length === 0 && <p className="mt-4 text-stone-800">This project doesn't have any tasks yet.</p>}
            {project.tasks.length > 0 && <ul className="p-4 mt-8 list-disc rounded-md bg-stone-100">
                {project.tasks.map((task) => {
                    return (
                        <li key={task.id} className="flex my-4 justify-between">
                            <span>{task.task}</span>
                            <button className="text-stone-700 hover:text-red-500"
                                    onClick={() => deleteTask(project.id, task.id)}>Clear
                            </button>
                        </li>
                    )
                })}
            </ul>}
        </section>
    )
}