import React from "react";
import Task from "../Task/Task";
import "./TaskList.css";

function TaskList({ tasks, fetchTasks, selectedDate, filterName }) {
  function dateIntoText(date) {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayOfWeek = daysOfWeek[date.getDay()]; // Get abbreviated weekday
    const month = months[date.getMonth()]; // Get abbreviated month
    const day = String(date.getDate()).padStart(2, "0"); // Get day with leading zero if necessary
    const year = date.getFullYear(); // Get full year

    return `${dayOfWeek}, ${month} ${day}, ${year}`;
  }

  const findTaskIndexByName = (name) => {
    return tasks.findIndex((task) => task.name === name);
  };

  // Handle no tasks available
  if (tasks.length === 0) {
    return (
      <h5 className="no-task-message">
        No tasks available for <br />
        {dateIntoText(selectedDate)}
      </h5>
    );
  }

  // Filter tasks based on currentFilter
  const filteredTasks =
    filterName === "all"
      ? tasks
      : tasks.filter((task) => task.status === filterName);

  return (
    <ul className="tasks-list">
      {filteredTasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          index={index}
          fetchTasks={fetchTasks}
          getIndexByName={findTaskIndexByName}
        />
      ))}
    </ul>
  );
}

export default TaskList;
