import React from "react";
import ProjectsList from "./ProjectsList";
import TeamMembersList from "./TeamMembersList";
 

export default function Sidebar() { 
  return (
    <div className="sidebar mt-8 ">
      {/* <!-- Projects List --> */}
      <ProjectsList />

      {/* <!-- Team Members --> */}
      <TeamMembersList />
    </div>
  );
}
