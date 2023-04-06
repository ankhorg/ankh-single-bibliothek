import type { ReactElement } from "react";
import { Fragment } from "react";
import {Build} from "../../lib/service/types";

export interface SoftwareBuildChangesProps {
  project: string;
  build: Build;
}

const SoftwareBuildChanges = ({
  project,
  build,
}: SoftwareBuildChangesProps): ReactElement => (
  <>
    {build.changes.map((change) => (
      <p key={change.commit}>
        <a
          href={`https://github.com/ankhorg/${project}/commit/${change.commit}`}
          className="text-blue-600 dark:text-blue-500 mr-1 font-mono"
          rel="noreferrer"
          target="_blank"
        >
          {change.commit.slice(0, 7)}
        </a>
        {highlightIssues(change.summary, project, "text-blue-600 dark:text-blue-500")}
      </p>
    ))}
    {build.changes.length === 0 && <i className="text-gray-600">No changes</i>}
  </>
);

export default SoftwareBuildChanges;

const highlightIssues = (
  summary: string,
  project: string,
  highlightClass: string
): JSX.Element[] => {
  return summary.split(/([^&])(#[0-9]+)/gm).map((part: string, i: number) => {
    if (!part.match(/#[0-9]+/)) {
      return <Fragment key={i}>{part}</Fragment>;
    }

    return (
      <a
        key={i}
        className={highlightClass}
        href={`https://github.com/ankhorg/${project}/issues/${part.slice(1)}`}
        target="_blank"
        rel="noreferrer"
      >
        {part}
      </a>
    );
  });
};
