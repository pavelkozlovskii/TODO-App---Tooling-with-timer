import React from 'react';
import './TasksFilter.css';
import PropTypes from 'prop-types';

const TasksFilter = ({ setFilter, filter }) => {
  const handleFilter = (f) => {
    setFilter(f);
  };

  return (
      <ul className="filters">
        <li>
          <button
              className={filter === 'All' ? 'selected' : ''}
              type="button"
              onClick={() => handleFilter('All')}
          >
            All
          </button>
        </li>
        <li>
          <button
              className={filter === 'Active' ? 'selected' : ''}
              type="button"
              onClick={() => handleFilter('Active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
              className={filter === 'Completed' ? 'selected' : ''}
              type="button"
              onClick={() => handleFilter('Completed')}
          >
            Completed
          </button>
        </li>
      </ul>
  );
};

TasksFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

export default TasksFilter;