import { useState } from 'react'
import SoftwareBuildsTable from "./components/data/SoftwareBuildsTable";
import DownloadsTree from "./components/layout/DownloadsTree";
import {useVersionBuilds} from "./lib/service/v2";

export default function(props:{
  defaultProject:string
  defaultVersion:string
  onUpdate(project: string, version: string): void;
}) {
  const [selectedProject, setSelectedProject] = useState(props.defaultProject);
  const [selectedVersion, setSelectedVersion] = useState(props.defaultVersion);
  const { data: builds } = useVersionBuilds(selectedProject, selectedVersion);

  props.onUpdate(selectedProject, selectedVersion)

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-1 flex flex-row min-h-0">
          <DownloadsTree
            id={selectedProject}
            name={selectedVersion}
            selectedProject={selectedProject}
            selectedVersion={selectedVersion}
            onSelect={(project, version) => {
              setSelectedProject(project);
              setSelectedVersion(version);
            }}
          />
          <div className="flex-1 overflow-auto">
            <SoftwareBuildsTable
              project={selectedProject}
              version={selectedVersion}
              builds={builds?.builds ?? []}
            />
          </div>
        </div>
      </div>
    </>
  );
}
