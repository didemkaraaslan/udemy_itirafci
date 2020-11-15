import React from "react";
import Confession from "../../features/confession/Confession";

const Favorites = ({ confessions, currentUser }) => {
  return confessions
    .filter(
      ({ favorites }) =>
        favorites.hasOwnProperty(currentUser.uid) &&
        favorites[currentUser.uid] === 1
    )
    .map((confession) => (
      <Confession key={confession.id} confession={confession} />
    ));
};

export default Favorites;
