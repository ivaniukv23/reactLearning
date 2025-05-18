import {useState} from "react";

import Sidebar from "./components/Sidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/SelectedProject.jsx";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectID: undefined,
        projects: []
    })

    let content;

    if(projectsState.selectedProjectID === null) {
        content = <NewProject onAdd={handleAddProject} cancelAdd={handleCancelAddProject}/>
    }else if(projectsState.selectedProjectID === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
    }else {
        for(const project of projectsState.projects) {
            if(project.id === projectsState.selectedProjectID) {
                content = <SelectedProject project={project} onDelete={handleDeleteProject} addTasks={handleAddTasks} deleteTask={handleDeleteTask}/>
            }
        }
    }

    function handleDeleteTask(projectID, taskID) {
        setProjectsState(prevState => {
            const updatedProjects = prevState.projects.map(project => {
                if(project.id === projectID) {
                    const updatedTasks = project.tasks.filter(task => task.id !== taskID);
                    return {
                        ...project,
                        tasks: updatedTasks,
                    }
                }
            });

            return {
                ...prevState,
                projects: updatedProjects,
            }

        })
    }

    function handleAddTasks(id, enteredTask) {



        setProjectsState(prevState => {
            const updatedProjects = prevState.projects.map(project => {
                if(project.id === id) {
                    return {
                        ...project,
                        tasks: [...project.tasks, {task: enteredTask, id: Math.random()}]
                    }
                }
            })

            return {
                ...prevState,
                projects: updatedProjects,
            }
        })
    }

    function handleStartAddProject(){
        setProjectsState(prev => {
            return {
                ...prev,
                selectedProjectID: null,
            }
        })
    }



    function handleChooseProject(projectID) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectID: projectID,
            }
        })
    }

    function handleCancelAddProject(){
        setProjectsState(prevState => {
            return {
                ...prevState,
                selectedProjectID: undefined,
            }
        })
    }

    function handleAddProject(projectData){
        setProjectsState(prevState => {
            const newProject = {
                ...projectData,
                id: Math.random()
            }

            return {
                ...prevState,
                selectedProjectID: undefined,
                projects: [...prevState.projects, newProject]
            }
        })
    }


    function handleDeleteProject(id) {

        setProjectsState(prevState => {
            const newProjectList = prevState.projects;
            newProjectList.splice(newProjectList.findIndex(project => project.id===id), 1);

            return {
                ...prevState,
                selectedProjectID: undefined,
                projects: newProjectList,
            }
        })
    }

    return (
        <main className="h-screen my-8 flex gap-8">
            <Sidebar
                projects={projectsState.projects}
                onStartAddProject={handleStartAddProject}
                onChoose={handleChooseProject}
                selectedProjectID={projectsState.selectedProjectID}
            />
            {content}
        </main>
    );
}

export default App;
