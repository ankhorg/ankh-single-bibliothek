import type { Build } from "../service/types";

export interface DownloadsContextProps {
  projectId: string;
  project?: ProjectDescriptor;
  builds?: Build[];
  version: string;
  stable: boolean;
}

export interface ProjectDescriptor {
  name: string;
  latestStableVersion: string;
  latestExperimentalVersion: string | null;
  latestVersionGroup: string;
}

export interface ProjectProps {
  project: ProjectDescriptor;
}
