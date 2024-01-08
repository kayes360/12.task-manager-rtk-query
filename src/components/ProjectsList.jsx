import React, { useEffect, useState } from "react";
import Checkbox from "./Checkbox";
import { useGetProjectsQuery } from "../features/projects/projectsApi";
import Error from "./Error";
import Loading from "./Loading";

export default function ProjectsList({ setFilteredProjects, projectNameList, setProjectNameList }) {
  const { data: projects, isLoading, isError, error } = useGetProjectsQuery();

  useEffect(() => {
    if (projects?.length > 0) {
      setProjectNameList(projects?.map((project) => project.projectName));
    }
  }, [projects]);



  /* --------------------- */
  /* Decide what to render */
  /* --------------------- */
  let content = null;
  /* in loading condition */
  if (isLoading) {
    content = <Loading loadingMessage="Content is loading.." />;
  }
  /* in not loading but error condition */
  if (!isLoading && isError) {
    content = <Error errorMessage={error} />;
  }
  /* in not loading and not error but array of object length is 0 */
  if (!isLoading && isError && projects?.length === 0) {
    content = <Error errorMessage="No Projects Found!" />;
  }
  /* in not loading and not error but array of object length is greater than 0 */
  if (!isLoading && !isError && projects?.length > 0) {
    content = projects.map((project) => (
      <Checkbox
        key={project.id}
        project={project}
        projectNameList={projectNameList}
        setProjectNameList={setProjectNameList}
      />
    ));
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}
