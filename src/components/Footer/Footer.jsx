import React from 'react';
import './Footer.css';
import PropTypes from 'prop-types';
import TasksFilter from '../TasksFilter';

const Footer = ({ setFilter, tasks, setTasks, filter }) => {
    const clearCompleted = () => {
        setTasks(tasks.filter((task) => !task.completed));
    };

    const activeTasks = tasks.filter((task) => !task.completed);

    return (
        <footer className="footer">
      <span className="todo-count">
        <strong>{activeTasks.length}</strong> item
          {activeTasks.length !== 1 ? 's' : ''} left
      </span>
            <TasksFilter setFilter={setFilter} filter={filter} />
            {tasks.some((task) => task.completed) && (
                <button className="clear-completed" onClick={clearCompleted}>
                    Clear completed
                </button>
            )}
        </footer>
    );
};

Footer.propTypes = {
    setFilter: PropTypes.func.isRequired,
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            completed: PropTypes.bool.isRequired,
        })
    ).isRequired,
    setTasks: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
};

export default Footer;