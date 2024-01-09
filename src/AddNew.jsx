import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { useGetProjectsQuery } from "./features/projects/projectsApi";
import { useGetTeamMembersQuery } from "./features/teamMembers/teamMembersApi";
import Error from "./components/Error";
import { useAddTaskMutation } from "./features/tasks/tasksApi";
import { useNavigate } from "react-router-dom";
export default function AddNew() {
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

  const [addTask, { isSuccess: isAddTaskSuccess }] = useAddTaskMutation();
  const navigate =useNavigate();

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

    const newTask = {
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
    };

    addTask(newTask);
  };

  // useEffect(() => {
  //    if (isAddTaskSuccess) {
  //     navigate("/")
  //    }
  // }, [isAddTaskSuccess])
  
  return (
    <>
      <Navbar />
      <div className="container relative">
        <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
          <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
            Create Task for Your Team
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
                  placeholder="Set Task Name"
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
                    {isProjectsError ? "No team member found" : "Select Job"}
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
                    {isTeamError ? "No project found " : "Select Project"}
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
