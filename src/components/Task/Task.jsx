import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Task.css";
import Modal from "../Modal/Modal";

const Task = ({ task, fetchTasks, getIndexByName }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const settingsRef = useRef(null);

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }

  const parseFormattedDateString = (formattedDate) => {
    const [year, month, day] = formattedDate.split("-").map(Number); // Split the string and convert each part to a number
    return new Date(year, month - 1, day); // Create a new Date object (month is zero-based)
  };

  const formatDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  function changeStatus(formattedTaskDate) {
    const tasks = JSON.parse(localStorage.getItem(formattedTaskDate)) || [];
    if (tasks[getIndexByName(task.name)].status === "pending") {
      tasks[getIndexByName(task.name)].status = "completed";
    } else {
      tasks[getIndexByName(task.name)].status = "pending";
    }
    localStorage.setItem(formattedTaskDate, JSON.stringify(tasks));
    fetchTasks(parseFormattedDateString(formattedTaskDate));
  }
  const toggleTaskMenu = () => {
    setShowMenu((prev) => !prev);
  };

  // Function to find the index of a task by name

  function editTask(taskDate, userTask, task) {
    const updatedTask = userTask.trim();
    const formattedTaskDate = formatDateString(taskDate);
    if (updatedTask) {
      if (formattedTaskDate === task.date) {
        const tasks = JSON.parse(localStorage.getItem(task.date)) || [];
        tasks[getIndexByName(task.name)].name = updatedTask;
        localStorage.setItem(task.date, JSON.stringify(tasks));
        fetchTasks(taskDate);
      } else {
        const newtask = {
          name: updatedTask,
          status: "pending",
          date: formattedTaskDate,
        };
        const tasks = JSON.parse(localStorage.getItem(formattedTaskDate)) || [];
        tasks.push(newtask);
        localStorage.setItem(formattedTaskDate, JSON.stringify(tasks));
        deleteTask(task.date);
      }
      toggleModal();
    } else {
      alert("Enter a valid Task");
    }
  }

  function deleteTask(taskDate) {
    const tasks = JSON.parse(localStorage.getItem(taskDate)) || [];
    tasks.splice(getIndexByName(task.name), 1);
    if (tasks.length === 0) {
      localStorage.removeItem(taskDate);
    } else {
      localStorage.setItem(taskDate, JSON.stringify(tasks));
    }
    fetchTasks(parseFormattedDateString(taskDate));
  }

  // console.log(settingsRef);
  const handleClickOutside = (event) => {
    // console.log(settingsRef.current);
    if (settingsRef.current && !settingsRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isModalOpen && event.target.className === "modal") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isModalOpen]);

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <>
      <li className="task">
        <label>
          <input
            type="checkbox"
            onChange={() => changeStatus(task.date)}
            checked={task.status === "completed"}
          />
          <p
            className="task-info"
            style={{
              textDecoration:
                task.status === "completed" ? "line-through" : "none",
            }}
          >
            {task.name}
          </p>
        </label>
        <div className="settings" ref={settingsRef}>
          <i
            className="fa-solid fa-ellipsis-vertical"
            onClick={toggleTaskMenu}
          ></i>
          <AnimatePresence>
            {showMenu && (
              <motion.ul
                className="task-menu show"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.01 }}
              >
                <li
                  className="edit-task"
                  onClick={() => {
                    toggleModal();
                    toggleTaskMenu();
                    console.log(task.name);
                  }}
                >
                  <i className="fa-regular fa-pen-to-square"></i>Edit
                </li>
                <li
                  className="del-task"
                  onClick={() => {
                    deleteTask(task.date);
                    toggleTaskMenu();
                  }}
                >
                  <i className="fa-regular fa-trash-can"></i>Delete
                </li>
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </li>
      <Modal
        action="edit"
        isOpen={isModalOpen}
        closeModal={toggleModal}
        selectedTodoDate={parseFormattedDateString(task.date)}
        taskInfo={(taskDate, userTask) => editTask(taskDate, userTask, task)}
        taskName={task.name}
      />
    </>
  );
};

export default Task;
