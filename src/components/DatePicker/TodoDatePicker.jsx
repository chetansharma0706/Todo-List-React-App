// src/components/DatePicker.js
import "./TodoDatePicker.css";
import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Custom Input Component for DatePicker
const TodoDateText = forwardRef(({ value, onClick, className }, ref) => (
  <p className={className} onClick={onClick} ref={ref}>
    {value ? value : "Select a date"}
    <i
      className="fa-regular fa-calendar-days"
      id="calender-todoDate"
      style={{ marginLeft: "10px" }}
    ></i>
  </p>
));

function TodoDatePicker({
  selectedDate,
  onDateChange,
  inputClassName,
  minDate = null,
}) {
  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => onDateChange(date)}
        customInput={<TodoDateText className={inputClassName} />}
        minDate={minDate}
        dateFormat="EEE, MMM dd, yyyy"
      />
    </div>
  );
}

export default TodoDatePicker;
