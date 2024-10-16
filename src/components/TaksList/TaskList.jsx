import React from 'react';
import './TaskList.css';
import PropTypes from 'prop-types';
import Task from '../Task';

const TaskList = ({ tasks, onDelete, setTasks, editTask, switchTimer, filter }) => {
    const filteredTasks = tasks.filter((task) =>
        filter === 'All' || (filter === 'Active' && !task.completed) || (filter === 'Completed' && task.completed)
    );

    return (
        <ul className="todo-list">
            {filteredTasks.map((task) => (
                <Task
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    tasks={tasks}
                    setTasks={setTasks}
                    editTask={editTask}
                    switchTimer={switchTimer}
                />
            ))}
        </ul>
    );
};

TaskList.propTypes = {
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
            added: PropTypes.instanceOf(Date).isRequired,
        })
    ).isRequired,
    onDelete: PropTypes.func.isRequired,
    setTasks: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    switchTimer: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
};

export default TaskList;