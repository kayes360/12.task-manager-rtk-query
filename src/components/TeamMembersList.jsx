import React from "react";
import TeamMember from "./TeamMember";

import { useGetTeamMembersQuery } from "../features/teamMembers/teamMembersApi";
import Loading from "./Loading";
import Error from "./Error";
export default function TeamMembersList() {
  const { data: team, isLoading, isError, error } = useGetTeamMembersQuery();
  // console.log("team", team) 

  /* --------------------- */
  /* Decide what to render */
  /* --------------------- */
  let content = null;
  /* in loading condition */
  if (isLoading) {
    content = <Loading loadingMessage="Content is loading.." />;
  }
  /* in not loading but error condition */
  if (!isLoading && isError) {
    content = <Error errorMessage={error} />;
  }
  /* in not loading and not error but array of object length is 0 */
  if (!isLoading && isError && team?.length === 0) {
    content = <Error errorMessage="No Team Member Found!" />;
  }
  /* in not loading and not error but array of object length is greater than 0 */
  if (!isLoading && !isError && team?.length > 0) {
    content = team.map((teamMember) => ( 
       <TeamMember key={teamMember.id} teamMember={teamMember}/> 
    ));
  }
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">
        {content}
      </div>
    </div>
  );
}
