import {useState} from "react";

import Sidebar from "./components/Sidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";

function App() {
    const [projectsState, setProjectsState] = useState({
        selectedProjectID: undefined,
        projects: []
    })

    function handleStartAddProject(){
        setProjectsState(prev => {
            return {
                ...prev,
                selectedProjectID: null,
            }
        })
    }

    let content;

    if(projectsState.selectedProjectID === null) {
        content = <NewProject onAdd={handleAddProject} />
    }else if(projectsState.selectedProjectID === undefined) {
        content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>
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

    return (
        <main className="h-screen my-8 flex gap-8">
            <Sidebar projects={projectsState.projects} onStartAddProject={handleStartAddProject}/>
            {content}
        </main>
    );
}

export default App;
