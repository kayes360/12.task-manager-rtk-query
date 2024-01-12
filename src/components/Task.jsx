import React from "react";

import { FiEdit } from "react-icons/fi";
import { GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  useDeleteTaskMutation, 
  useUpdateTaskStatusMutation,
} from "../features/tasks/tasksApi";
export default function Task({ task }) {
  const { id, taskName, teamMember, project, deadline, status } = task;
  const deadlineDate = moment(deadline).format("DD");
  const deadlineMonth = moment(deadline).format("MMMM");

  const [updateTaskStatus, { isSuccess: isUpdateTaskSuccess }] =
  useUpdateTaskStatusMutation();
  const [deleteTask, { isSuccess: isDeleteTaskSuccess }] =
    useDeleteTaskMutation();

  const handleDelete = () => {
    console.log("handle delete", id);
    deleteTask(id);
    console.log("handle delete", id);
  };

  const handleStatus = (e) => {
    const selectedTaskId = e.target.id;
    const selectedTaskStatus = e.target.value;
    const updatedStatusInfo = {
      selectedTaskId,
      updatedStatus: { status: selectedTaskStatus },
    };
    updateTaskStatus(updatedStatusInfo);
  };

  //status
  //fix badge color
  return (
    <div className="lws-task">
      <div className="flex items-center gap-2 text-slate">
        <h2 className="lws-date">{deadlineDate}</h2>
        <h4 className="lws-month">{deadlineMonth}</h4>
      </div>

      <div className="lws-taskContainer">
        <h1 className="lws-task-title">{taskName}</h1>
        <span className={`lws-task-badge ${project.colorClass}`}>
          {project.projectName}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <img src={teamMember.avatar} className="team-avater" />
          <p className="lws-task-assignedOn">{teamMember.name}</p>
        </div>
        {/* <!-- delete button will not shown to the ui, until the status of the task will be completed --> */}

        {status === "completed" && (
          <button className="lws-delete" onClick={handleDelete}>
            <GoTrash className="w-6 h-6 text-gray-600 hover:text-red-600" />
          </button>
        )}
        {status !== "completed" && (
          <Link to={`/edittaskform/${id}`} className="lws-edit">
            <FiEdit className="w-6 h-6 text-gray-600 hover:text-indigo-600" />
          </Link>
        )}

        <select
          className="lws-status"
          value={status}
          id={id}
          onChange={(e) => handleStatus(e)}
        >
          <option value="pending">Pending</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
}
