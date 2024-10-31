import "./App.css";
import { useState, useEffect } from "react";
import TodoDatePicker from "./components/DatePicker/TodoDatePicker";
import TaskList from "./components/TaskList/TaskList";
import Button from "./components/Button/Button";
import Modal from "./components/Modal/Modal";
import Filters from "./components/Filters/Filters";

function App() {
  const [selectedTodoDate, setSelectedTodoDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isModalOpen && event.target.className === "modal") {
        setIsModalOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [isModalOpen]);

  const createTask = (date, userTask) => {
    if (!userTask) return alert("Please enter a task");

    const formattedDate = formatDateString(date);
    const newTask = {
      name: userTask.trim(),
      status: "pending",
      date: formattedDate,
    };
    const tasks = JSON.parse(localStorage.getItem(formattedDate)) || [];
    const updatedTasks = [...tasks, newTask];
    localStorage.setItem(formattedDate, JSON.stringify(updatedTasks));
    fetchTasks(date);
    toggleModal();
  };

  const fetchTasks = (date) => {
    const formattedDate = formatDateString(date);
    const storedTasks = JSON.parse(localStorage.getItem(formattedDate)) || [];
    setTasks(storedTasks);
    setSelectedTodoDate(date);
  };

  function deleteAllTasks() {
    localStorage.removeItem(formatDateString(selectedTodoDate));
    fetchTasks(selectedTodoDate);
  }

  const formatDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => fetchTasks(selectedTodoDate), [selectedTodoDate]);

  return (
    <div className="wrapper">
      <div className="todo-date">
        <TodoDatePicker
          selectedDate={selectedTodoDate}
          onDateChange={setSelectedTodoDate}
          inputClassName="date-text"
        />
      </div>
      {tasks.length !== 0 && (
        <div className="controls">
          <Filters currentFilter={(filter) => setFilter(filter)} />
          <Button
            onClick={() => {
              deleteAllTasks();
            }}
            value="Clear All"
          />
        </div>
      )}
      <div className="tasks">
        <TaskList
          tasks={tasks}
          fetchTasks={fetchTasks}
          selectedDate={selectedTodoDate}
          filterName={filter}
        />
      </div>
      <div className="add-btn">
        <Button
          onClick={toggleModal}
          iconClass="fa-solid fa-plus"
          value="Add Task"
        />
      </div>
      <Modal
        isOpen={isModalOpen}
        action="create"
        selectedTodoDate={
          selectedTodoDate >= new Date() ? selectedTodoDate : new Date()
        }
        closeModal={toggleModal}
        taskInfo={createTask}
      />
    </div>
  );
}

export default App;
