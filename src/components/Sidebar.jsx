import React, { useEffect, useState } from "react";
import ProjectsList from "./ProjectsList";
import TeamMembersList from "./TeamMembersList";
 

export default function Sidebar({setFilteredProjects, projectNameList, setProjectNameList}) { 
  

  return (
    <div className="sidebar mt-8 ">
      {/* <!-- Projects List --> */}
      <ProjectsList setFilteredProjects={setFilteredProjects} projectNameList={projectNameList} setProjectNameList={setProjectNameList}/>

      {/* <!-- Team Members --> */}
      <TeamMembersList />
    </div>
  );
}
