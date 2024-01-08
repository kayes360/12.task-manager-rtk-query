import React from "react";
import Navbar from "./components/Navbar";
import { useGetProjectsQuery } from "./features/projects/projectsApi";
import { useGetTeamMembersQuery } from "./features/teamMembers/teamMembersApi";

export default function AddNew() {
  const {
    data: projects,
    isLoading: isProjectsLoading,
    isError: isProjectsError,
    error: projectserror,
  } = useGetProjectsQuery();
  const {
    data: team,
    isLoading: isTeamLoading,
    isError: isTeamError,
    error: teamerror,
  } = useGetTeamMembersQuery();

  return (
    < >
      <Navbar />
      <div className="container relative">
        <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
          <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
            Create Task for Your Team
          </h1>

          <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
            <form className="space-y-6">
              <div className="fieldContainer">
                <label htmlFor="lws-taskName">Task Name</label>
                <input
                  type="text"
                  name="taskName"
                  id="lws-taskName"
                  required
                  placeholder="Implement RTK Query"
                />
              </div>

              <div className="fieldContainer">
                <label>Assign To</label>
                <select name="teamMember" id="lws-teamMember" required>
                  <option value="" hidden defaultValue>
                    Select Job
                  </option>
                  {team?.map((teamMember) => 
                  (
                    <option key={teamMember.id} value={teamMember.name}>
                      {teamMember.name}
                    </option>
                  )
                  )}
                </select>
              </div>
              <div className="fieldContainer">
                <label htmlFor="lws-projectName">Project Name</label>
                <select id="lws-projectName" name="projectName" required>
                  <option value="" hidden defaultValue>
                    Select Project
                  </option>
                  {projects?.map((project) => (
                    <option key={project.id} value={project.projectName}>
                      {project.projectName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="fieldContainer">
                <label htmlFor="lws-deadline">Deadline</label>
                <input type="date" name="deadline" id="lws-deadline" required />
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
