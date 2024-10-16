import React from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

const NewTaskForm = ({ addTask }) => {
    const minutesPattern = /^([0-5]?\d)$/;
    const secondsPattern = /^([0-5]?\d)$/;

    return (
        <form className="new-todo-form">
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                autoFocus
                onKeyDown={addTask}
            />
            <input
                className="new-todo-form__timer"
                placeholder="Min"
                autoFocus
                pattern={minutesPattern.source}
                onKeyDown={addTask}
            />
            <input
                className="new-todo-form__timer"
                placeholder="Sec"
                autoFocus
                pattern={secondsPattern.source}
                onKeyDown={addTask}
            />
        </form>
    );
};

NewTaskForm.propTypes = {
    addTask: PropTypes.func.isRequired,
};

export default NewTaskForm;