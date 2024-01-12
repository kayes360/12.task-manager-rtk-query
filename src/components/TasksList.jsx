import React, { useEffect, useState } from "react";
import Task from "./Task";
import Loading from "./Loading";
import Error from "./Error";
import { useGetTasksQuery } from "../features/tasks/tasksApi";

export default function TasksList({ projectNameList, searchInput }) { 
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();

  // Filter tasks based on projectNameList
  const filteredTasks = tasks?.filter(task =>
    projectNameList.includes(task.project.projectName)
  );

  // Filter tasks based on searchInput
  const searchFilteredTasks = filteredTasks?.filter(
    (task) =>
      !searchInput ||
      task.taskName.toLowerCase().includes(searchInput.toLowerCase()) ||
      task.teamMember.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  /* --------------------- */
  /* Decide what to render */
  /* --------------------- */
  let content = null;

  // Loading condition
  if (isLoading) {
    content = <Loading loadingMessage="Content is loading.." />;
  }

  // Error condition
  if (!isLoading && isError) {
    content = <Error errorMessage={error} />;
  }

  // No task found condition
  if (!isLoading && !isError && (!searchInput || searchFilteredTasks?.length === 0)) {
    content = <Error errorMessage="No Task Found!" />;
  }

  // Render tasks
  if (!isLoading && !isError && searchFilteredTasks?.length > 0) {
    content = searchFilteredTasks.map((task) => <Task key={task.id} task={task} />);
  }

  return <div className="lws-task-list">{content}</div>;
}
