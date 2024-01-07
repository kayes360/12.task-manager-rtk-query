import React from "react";

export default function Checkbox({project}) {
  const {projectName, colorClass} = project; 
  return (
    <div className="checkbox-container">
      <input id={projectName} type="checkbox" className={`${colorClass}`} defaultChecked />
      <label htmlFor={projectName} className="label">{projectName}</label>
    </div>
  );
}
