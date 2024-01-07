import React from "react";
import avatar from "/images/avatars/akash.png";

export default function TeamMember({teamMember}) {
  const {name, avatar} = teamMember; 
  return (
    <div className="checkbox-container">
      <img src={avatar} className="team-avater"/>
      <p className="label">{name}</p>
    </div>
  );
}
