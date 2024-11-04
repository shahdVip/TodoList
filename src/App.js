import React, { useState } from 'react';
import TodoList from './components/TodoList';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [warning, setWarning] = useState(''); // New state for warning message

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
        setWarning(''); // Clear warning when user starts typing
    };

    const handleAddTask = () => {
        if (newTask.trim()) {
            setTasks([
                ...tasks,
                { id: Date.now(), text: newTask, isCompleted: false }
            ]);
            setNewTask('');
            setWarning(''); // Clear the warning after a successful addition
        } else {
            setWarning('Task cannot be empty.'); // Set warning message if input is empty
        }
    };

    const handleToggle = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        ));
    };

    const handleDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleEdit = (id, newText) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, text: newText } : task
        ));
    };

    return (
        <div className="todo-app">
            <h1>Todo List</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={newTask}
                    onChange={handleInputChange}
                    placeholder="Enter a new task"
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>

            {/* Conditionally render the warning message */}
            {warning && <p className="warning">{warning}</p>}

            <TodoList
                tasks={tasks}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onEdit={handleEdit}
            />
        </div>
    );
};

export default App;
