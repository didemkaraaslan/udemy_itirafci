import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConfessions } from "./confessionSlice";
import Confession from "./Confession";

const ConfessionsList = () => {
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

  return (
    <div>
      {confessions.map((confession) => (
        <Confession key={confession.id} confession={confession} />
      ))}
    </div>
  );
};

export default ConfessionsList;
