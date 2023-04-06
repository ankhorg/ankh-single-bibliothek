import { useProjects } from "../../lib/service/v2";

export default function(){
    const {data:projects} = useProjects()
    if(projects === undefined){
        return <>
            Loading...
        </>
    }else{
        return <>
            {projects.projects.map((project_id)=>{
                return <li>
                    <a href={project_id}>{project_id}</a>
                </li>
            })}
        </>
    }
}