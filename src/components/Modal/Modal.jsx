import "./Modal.css";
import React, { useState, useEffect } from "react";
import TodoDatePicker from "../DatePicker/TodoDatePicker";
import Button from "../Button/Button";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({
  action,
  selectedTodoDate,
  closeModal,
  isOpen,
  taskInfo,
  taskName,
}) => {
  const [selectedTaskDate, setSelectedTaskDate] = useState(selectedTodoDate);
  const [taskText, setTaskText] = useState(taskName || "");

  // Update taskText whenever taskName prop changes
  useEffect(() => {
    setTaskText(taskName);
  }, [taskName]);

  // Update selectedTaskDate whenever date prop changes
  useEffect(() => {
    setSelectedTaskDate(selectedTodoDate);
  }, [selectedTodoDate]);

  const handleSubmit = () => {
    if (taskText.trim()) {
      taskInfo(selectedTaskDate, taskText);
      setTaskText(""); // Clear the input field
    } else {
      alert("Please enter a valid task");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal">
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.18 }}
          >
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>{action === "create" ? "Create New Task" : "Edit Task"}</h2>
            <textarea
              rows="4"
              className="task-input"
              placeholder="Define Your Task..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />

            <div className="task-date">
              <label>Your Task is Schedule for: </label>
              <TodoDatePicker
                selectedDate={selectedTaskDate}
                onDateChange={setSelectedTaskDate}
                inputClassName="task-date-text"
                minDate={action === "create" ? new Date() : null}
              />
            </div>
            <Button
              value={action === "create" ? "Create Task" : "Edit Task"}
              iconClass={
                action === "create"
                  ? "fa-solid fa-plus"
                  : "fa-regular fa-pen-to-square"
              }
              onClick={handleSubmit}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
