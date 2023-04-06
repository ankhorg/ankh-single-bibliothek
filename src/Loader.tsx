import App from "./App"
import ProjectList from "./components/data/ProjectList"
import { useProject } from "./lib/service/v2"

function notFoundResponse(){
    return <>
        404
    </>
}

export default function(){
    const pathElements = window.location.pathname.substring(1).split('/').filter(it => it.length !== 0)
    if(pathElements.length === 0){
        return <>
            <ProjectList />
        </>
    }
    const {data:project} = useProject(pathElements[0])
    if(project === undefined){
        return <>
            Loading...
        </>
    }else{
        const defaultProject:string = project.project_id
        const defaultVersion:string = pathElements.length > 1 ? pathElements[1] : project.versions[0]
        if(!project.versions.includes(defaultVersion)){
            return notFoundResponse()
        }
        return <>
            {project && <>
                <App 
                    defaultProject={defaultProject}
                    defaultVersion={defaultVersion}
                    onUpdate={(project, version) => {
                        document.title = project + "/" + version + " | build.irepo.space"
                        history.pushState("", "", "/" + project + "/" + version)
                    }}
                />
            </>}
        </>
    }
}