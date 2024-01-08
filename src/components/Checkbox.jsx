import React, { useEffect, useState } from "react";

export default function Checkbox({
  project,
  projectNameList,
  setProjectNameList,
}) {
  const { projectName, colorClass } = project;

 

  const handleCheckbox = () => {
    if (projectNameList.includes(projectName)) {
      setProjectNameList(projectNameList.filter((pName)=> pName !== projectName))
    }else{
      setProjectNameList((prevList) => [...prevList, projectName]); 
    }
  };

  return (
    <div className="checkbox-container">
      <input
        id={projectName}
        type="checkbox"
        className={`${colorClass}`}
        defaultChecked
        onChange={handleCheckbox}
      />
      <label htmlFor={projectName} className="label">
        {projectName}
      </label>
    </div>
  );
}
