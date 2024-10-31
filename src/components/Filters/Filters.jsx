import React, { useEffect, useState } from "react";
import "./Filters.css";

const Filters = ({ currentFilter }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    currentFilter(filter);
  };
  return (
    <div className="filters">
      <span
        id="all"
        onClick={() => handleFilterClick("all")}
        className={activeFilter === "all" ? "active" : ""}
      >
        All
      </span>
      <span
        id="pending"
        onClick={() => handleFilterClick("pending")}
        className={activeFilter === "pending" ? "active" : ""}
      >
        Pending
      </span>
      <span
        id="completed"
        onClick={() => handleFilterClick("completed")}
        className={activeFilter === "completed" ? "active" : ""}
      >
        Completed
      </span>
    </div>
  );
};

export default Filters;
