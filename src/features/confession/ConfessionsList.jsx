import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConfessions } from "./confessionSlice";
import Confession from "./Confession";
import ConfessionSkeleton from "./ConfessionSkeleton";
import {
  ALL,
  NOT_ANONYMOUS,
  ONLY_ANONYMOUS,
  MOST_APPROVED,
  MOST_JUDGED,
} from "../../utils/Tags";

const ConfessionsList = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { confessions, loading, currentCategory } = useSelector(
    (state) => state.confessions
  );

  useEffect(() => {
    if (loading === "idle") {
      dispatch(fetchConfessions());
    }
  }, [dispatch]);

  const applySpecialFilter = (confessions) => {
    switch (currentCategory) {
      case ONLY_ANONYMOUS:
        return confessions.filter(
          (confession) => confession.shareAs === "anonymous"
        );
      case NOT_ANONYMOUS:
        return confessions.filter(
          (confession) => confession.shareAs === "user"
        );
      case MOST_APPROVED:
        return confessions
          .slice()
          .sort((a, b) => b.numberOfLikes - a.numberOfLikes);
      case MOST_JUDGED:
        return confessions
          .slice()
          .sort((a, b) => b.numberOfDislikes - a.numberOfDislikes);
    }
  };

  const prepareConfessions = (confessions) => {
    const specials = [
      NOT_ANONYMOUS,
      ONLY_ANONYMOUS,
      MOST_APPROVED,
      MOST_JUDGED,
    ];

    let ordered = confessions.slice().sort((a, b) => b.timestamp - a.timestamp);

    if (currentCategory !== ALL) {
      if (specials.includes(currentCategory)) {
        // Özel filtre uygula
        ordered = applySpecialFilter(ordered);
      } else {
        // Genel filtre uygula
        ordered = ordered.filter((confession) =>
          confession.tags.some((tag) => tag == currentCategory)
        );
      }
    }

    if (searchTerm !== "") {
      const regex = new RegExp(searchTerm, "gi");
      ordered = ordered.slice().reduce((acc, confession) => {
        const {
          content,
          user: { username },
        } = confession;
        if ([content, username].some((i) => i.match(regex))) {
          acc.push(confession);
        }
        return acc;
      }, []);
    }

    return ordered;
  };

  const displaySkeleton = () =>
    [...Array(10)].map((_, i) => <ConfessionSkeleton key={i} />);

  if (loading === "pending") {
    return displaySkeleton();
  }

  return (
    <div>
      {prepareConfessions(confessions).map((confession) => (
        <Confession key={confession.id} confession={confession} />
      ))}
    </div>
  );
};

export default ConfessionsList;
