import React from "react";
import Confession from "../../features/confession/Confession";

const Liked = ({ confessions, currentUser }) => {
  return confessions
    .filter(
      ({ feelings }) =>
        feelings.hasOwnProperty(currentUser.uid) &&
        feelings[currentUser.uid] === 1
    )
    .map((confession) => (
      <Confession key={confession.id} confession={confession} />
    ));
};

export default Liked;
