import React, { useState } from 'react';
import './Task.css';
import PropTypes from 'prop-types';
import { format, formatDistanceToNow } from 'date-fns';

const Task = ({ task, tasks, onDelete, setTasks, editTask, switchTimer }) => {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const changeTaskStatus = () => {
    setTasks(
        tasks.map((item) =>
            task.id === item.id ? { ...task, completed: !task.completed } : item
        )
    );
  };

  const handleEditTask = (e) => {
    if (editTask(e, task.id)) {
      setEditing(false);
    }
  };

  const handleSwitchTimer = () => {
    switchTimer(task.id, task.isRunning);
  };

  const { text, completed = false, id, added } = task;
  const status = editing ? 'editing' : completed ? 'completed' : '';

  return (
      <li className={status}>
        <div className="view">
          <input
              className="toggle"
              type="checkbox"
              checked={completed}
              onChange={changeTaskStatus}
              id={`taskToggle${task.id}`}
          />
          <label htmlFor={`taskToggle${task.id}`}>
            <span className="title">{text}</span>
            <span className="description">
            <button
                className="icon icon-play"
                onClick={() => handleSwitchTimer(task.id, false)}
            ></button>
            <button
                className="icon icon-pause"
                onClick={() => handleSwitchTimer(task.id, true)}
            ></button>
              {format(task.time, 'mm:ss')}
          </span>
            <span className="description">
            created {formatDistanceToNow(added, { includeSeconds: true })} ago
          </span>
          </label>
          <button
              className="icon icon-edit"
              type="button"
              aria-label="Edit task"
              onClick={() => {
                setEditing(true);
                setEditText(task.text);
              }}
          >
            <span aria-hidden="true" />
          </button>
          <button
              className="icon icon-destroy"
              type="button"
              onClick={() => onDelete(id)}
              aria-label="Delete task"
          >
            <span aria-hidden="true" />
          </button>
        </div>
        <input
            type="text"
            className="edit"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleEditTask}
        />
      </li>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    added: PropTypes.instanceOf(Date).isRequired,
    time: PropTypes.instanceOf(Date).isRequired,
    isRunning: PropTypes.bool.isRequired,
  }).isRequired,
  tasks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
  setTasks: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  switchTimer: PropTypes.func.isRequired,
};

export default Task;