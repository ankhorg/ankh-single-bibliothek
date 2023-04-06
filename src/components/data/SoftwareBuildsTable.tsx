import clsx from "clsx";

import SoftwareDownloadButton from "../input/SoftwareDownloadButton";

import {Build} from "../../lib/service/types";
import SoftwareBuildChanges from "./SoftwareBuildChanges";
import {formatISODateTime, formatRelativeDate} from "../../lib/util/time";

export interface SoftwareBuildsTableProps {
  project: string;
  version: string;
  builds: Build[];
}

const SoftwareBuildsTable = ({
  project,
  version,
  builds,
}: SoftwareBuildsTableProps) => {
  return (
    <table className="w-full relative">
      <thead>
        <tr className="text-left px-6 py-4 border-b dark:border-gray-600">
          <th className="text-left px-6 py-4 border-b dark:border-gray-600">Build</th>
          <th className="text-left px-6 py-4 border-b dark:border-gray-600">Changelog</th>
          <th className="text-left px-6 py-4 border-b dark:border-gray-600">Timestamp</th>
          <th className="text-left px-6 py-4 border-b dark:border-gray-600">Download</th>
        </tr>
      </thead>
      <tbody>
        {builds
          .slice()
          .reverse()
          .map((build) => (
            <tr key={build.build} className="border-b hover:bg-blue-100 dark:border-gray-600 dark:hover:bg-gray-900">
              <td className="px-6 py-2">
                <span
                  className={clsx(
                    "text-sm font-medium text-gray-100 rounded-full py-2 px-3 min-w-16",
                    build.channel === "experimental"
                      ? "bg-red-500"
                      : "bg-gray-800"
                  )}
                >
                  #{build.build}
                </span>
              </td>
              <td className="px-6 py-2">
                <SoftwareBuildChanges project={project} build={build} />
              </td>
              <td className="px-6 py-2" title={formatISODateTime(new Date(build.time))}>
                {formatRelativeDate(new Date(build.time))}
              </td>
              <td className="px-6 py-2 flex gap-1">
                <SoftwareDownloadButton
                  projectId={project}
                  version={version}
                  build={build}
                  stable={build.channel === "default"}
                  compact
                />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default SoftwareBuildsTable;
