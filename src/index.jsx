import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaksList';
import Footer from './components/Footer';

const data = [
  {
    id: crypto.randomUUID(),
    text: 'eat cookies',
    completed: true,
    added: new Date(),
    time: new Date(50000),
    isRunning: false,
  },
  {
    id: crypto.randomUUID(),
    text: 'drink coffee',
    completed: true,
    added: new Date(),
    time: new Date(80000),
    isRunning: false,
  },
  {
    id: crypto.randomUUID(),
    text: 'learn react',
    completed: false,
    added: new Date(),
    time: new Date(1000000),
    isRunning: false,
  },
];

function App() {
  const [tasks, setTasks] = useState(data);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const interval = setInterval(() => {
      setTasks((prevTasks) =>
          prevTasks.map((task) => {
            const { hours, minutes, seconds } = getHoursMinutesSeconds(task.time);
            const newTime = new Date(
                task.time.getFullYear(),
                task.time.getMonth(),
                task.time.getDate(),
                hours,
                minutes,
                seconds - 1
            );
            return {
              ...task,
              time: task.isRunning
                  ? newTime < new Date(0)
                      ? new Date(0)
                      : newTime
                  : task.time,
              added: new Date(task.added),
            };
          })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getHoursMinutesSeconds = (dateObj) => {
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    const seconds = dateObj.getSeconds();
    return { hours, minutes, seconds };
  };

  const switchTimer = (id) => {
    setTasks((prevTasks) =>
        prevTasks.map((item) =>
            item.id === id ? { ...item, isRunning: !item.isRunning } : item
        )
    );
  };

  const addTask = (event) => {
    if (event.key === 'Enter' && !/^\s*$/.test(event.target.value)) {
      const minutesInput = event.target.parentNode.querySelector(
          '.new-todo-form__timer'
      );
      const todoInput = event.target.parentNode.querySelector('.new-todo');
      const secondsInput = event.target.parentNode.querySelectorAll(
          '.new-todo-form__timer'
      )[1];

      const minutes = parseInt(minutesInput.value || '0', 10);
      const seconds = parseInt(secondsInput.value || '0', 10);

      if (minutes > 0 || seconds > 0) {
        const time = new Date();
        time.setHours(0, minutes, seconds, 0);

        const newTask = {
          id: crypto.randomUUID(),
          text: event.target.value,
          completed: false,
          added: new Date(),
          time,
          isRunning: false,
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
        todoInput.value = '';
        minutesInput.value = '';
        secondsInput.value = '';
      } else {
        alert('Пожалуйста, введите ненулевое значение для минут или секунд.');
      }
    }
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const editTask = (t, id) => {
    if (t.key === 'Enter') {
      setTasks((prevTasks) =>
          prevTasks.map((item) =>
              item.id === id ? { ...item, text: t.target.value } : item
          )
      );
      t.target.value = '';
      return true;
    }
  };

  return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addTask={addTask} />
        </header>
        <section className="main">
          <ul className="todo-list">
            <TaskList
                tasks={tasks}
                onDelete={deleteTask}
                filter={filter}
                setTasks={setTasks}
                editTask={editTask}
                switchTimer={switchTimer}
            />
          </ul>
        </section>
        <Footer
            setFilter={setFilter}
            tasks={tasks}
            setTasks={setTasks}
            filter={filter}
        />
      </section>
  );
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);