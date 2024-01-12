import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useGetProjectsQuery } from "./features/projects/projectsApi";
import { useGetTeamMembersQuery } from "./features/teamMembers/teamMembersApi";
import { useGetTaskQuery, useUpdateTaskMutation } from "./features/tasks/tasksApi";
import { useNavigate, useParams, useRouteError } from "react-router-dom";
import Error from "./components/Error";

export default function TaskForm() {
  const { id: paramId } = useParams();

  const { data: task, isLoading, isError, error } = useGetTaskQuery(paramId);
  const [updateTask, { isSuccess: isEditTaskSuccess }] =
  useUpdateTaskMutation();
 
  useEffect(() => {
    // console.log("task", task);
    if (task) {
      setTaskName(task.taskName)
      setAssignedTeamMemberId(task.teamMember.id)
      setAssignedTeamMember(task.teamMember.name)
      setAssignedTeamMemberAvatar(task.teamMember.avatar)

      setAssignedProjectId(task.project.id)
      setAssignedProject(task.project.projectName)
      setAssignedProjectColorClass(task.project.colorClass)

      setDeadline(task.deadline)   
    }
  }, [task]);

  const {
    data: team,
    isLoading: isTeamLoading,
    isError: isTeamError,
    error: teamerror,
  } = useGetTeamMembersQuery();

  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    error: projectserror,
  } = useGetProjectsQuery();

  const [taskName, setTaskName] = useState("");
  const [assignedTeamMemberId, setAssignedTeamMemberId] = useState("");
  const [assignedTeamMember, setAssignedTeamMember] = useState("");
  const [assignedTeamMemberAvatar, setAssignedTeamMemberAvatar] = useState("");

  const [assignedProjectId, setAssignedProjectId] = useState("");
  const [assignedProject, setAssignedProject] = useState("");
  const [assignedProjectColorClass, setAssignedProjectColorClass] =
    useState("");

  const [deadline, setDeadline] = useState("");

  const navigate = useNavigate();

  const handleTeamMember = (e) => {
    setAssignedTeamMember(e.target.value);
    setAssignedTeamMemberId(e.target.options[e.target.selectedIndex].id);
    setAssignedTeamMemberAvatar(
      e.target.options[e.target.selectedIndex].getAttribute("avatar")
    );
  };

  const handleProject = (e) => {
    setAssignedProject(e.target.value);
    setAssignedProjectId(e.target.options[e.target.selectedIndex].id);
    setAssignedProjectColorClass(
      e.target.options[e.target.selectedIndex].getAttribute("colorclass")
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    const updatedTaskData = {
      selectedTaskId: paramId,
      updatedData: {
        taskName,
      teamMember: {
        id: assignedTeamMemberId,
        name: assignedTeamMember,
        avatar: assignedTeamMemberAvatar,
      },
      project: {
        id: assignedProjectId,
        projectName: assignedProject,
        colorClass: assignedProjectColorClass,
      },
      deadline,
      status: "pending",
      }
    }; 
    updateTask(updatedTaskData)
  };

  useEffect(() => {
    if (isEditTaskSuccess) {
      navigate("/");
    }
  }, [isEditTaskSuccess]);

  return (
    <>
      <Navbar />
      <div className="container relative">
        <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
          <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
            Update Task for Your Team
          </h1>

          <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="fieldContainer">
                <label htmlFor="lws-taskName">Task Name</label>
                <input
                  type="text"
                  name="taskName"
                  id="lws-taskName"
                  required
                  placeholder={taskName || "Previous Task Not Found"}
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
              </div>

              <div className="fieldContainer">
                <label>Assign To</label>
                <select
                  name="teamMember"
                  id="lws-teamMember"
                  required
                  onChange={(e) => handleTeamMember(e)}
                >
                  <option value="" hidden defaultValue> 
                    {assignedTeamMember !== '' ? assignedTeamMember : "Select Team Member"}
                  </option>
                  {team?.map((teamMember) => (
                    <option
                      key={teamMember.id}
                      value={teamMember.name}
                      id={teamMember.id}
                      avatar={teamMember.avatar}
                    >
                      {teamMember.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="fieldContainer">
                <label htmlFor="lws-projectName">Project Name</label>
                <select
                  id="lws-projectName"
                  name="projectName"
                  required
                  onChange={(e) => handleProject(e)}
                >
                  <option value="" hidden defaultValue> 
                    {assignedProject !== '' ? assignedProject : "Select Project"}

                  </option>
                  {projects?.map((project) => (
                    <option
                      key={project.id}
                      value={project.projectName}
                      id={project.id}
                      colorclass={project.colorClass}
                    >
                      {project.projectName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="fieldContainer">
                <label htmlFor="lws-deadline">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  id="lws-deadline"
                  required
                  value={deadline !== '' ? deadline: ''}
                  onChange={(e) => {
                    setDeadline(e.target.value);
                  }}
                />
              </div>

              <div className="text-right">
                <button type="submit" className="lws-submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
