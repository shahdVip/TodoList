import React, { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, onToggle, onDelete, onEdit }) => {
    const [editTask, setEditTask] = useState(null);  // Track the task being edited
    const [editedText, setEditedText] = useState('');

    // Handle the edit button click
    const handleEditClick = (task) => {
        setEditTask(task);
        setEditedText(task.text);
    };

    // Handle canceling the edit
    const handleCancelClick = () => {
        setEditTask(null); // Reset the edit task state
        setEditedText('');
    };

    // Handle saving the edited task
    const handleSaveClick = (taskId) => {
        onEdit(taskId, editedText);
        setEditTask(null); // Reset the edit state after saving
        setEditedText('');
    };

    // Handle task deletion with confirmation
    const handleDeleteClick = (taskId) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this task?');
        if (isConfirmed) {
            onDelete(taskId);
        }
    };

    return (
        <ul className="todo-list">
            {tasks.length === 0 ? (
                <p>No tasks yet!</p>
            ) : (
                tasks.map(task => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        onToggle={onToggle}
                        onDelete={handleDeleteClick}
                        onEdit={handleEditClick}
                        editTask={editTask}
                        editedText={editedText}
                        setEditedText={setEditedText}
                        onCancel={handleCancelClick}
                        onSave={handleSaveClick}
                    />
                ))
            )}
        </ul>
    );
};

export default TodoList;
