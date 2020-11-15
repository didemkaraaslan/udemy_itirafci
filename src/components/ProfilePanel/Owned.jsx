import React from "react";
import Confession from "../../features/confession/Confession";

const Owned = ({ confessions, currentUser }) => {
  return confessions
    .filter((confession) => confession.user.uid === currentUser.uid)
    .map((confession) => (
      <Confession key={confession.id} confession={confession} />
    ));
};

export default Owned;
