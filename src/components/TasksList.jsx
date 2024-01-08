import React, { useEffect, useState } from "react";
import Task from "./Task";
import Loading from "./Loading";
import Error from "./Error";
import { useGetTasksQuery } from "../features/tasks/tasksApi";
export default function TasksList({ projectNameList }) { 
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();

  // Filter tasks based on projectNameList
  const filteredTasks = tasks?.filter(task =>
    projectNameList.includes(task.project.projectName)
  );

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
  if (!isLoading && isError && filteredTasks?.length === 0) {
    content = <Error errorMessage="No Task Found!" />;
  }
  /* in not loading and not error but array of object length is greater than 0 */
  if (!isLoading && !isError && filteredTasks?.length > 0) {
    content = filteredTasks.map((task) => <Task key={task.id} task={task} />);
  }
  
 

  return <div className="lws-task-list">{content}</div>;
}
