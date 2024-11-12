import React, { useState } from 'react';

const TodoItem = ({ task, onDelete, onToggle, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(task.text);

    // Handle the edit button click to enable editing
    const handleEditClick = () => {
        setIsEditing(true);
    };

    // Handle saving the edited task
    const handleSaveClick = () => {
        onEdit(task.id, newText);
        setIsEditing(false);
    };

    // Handle canceling the edit
    const handleCancelClick = () => {
        setIsEditing(false);
        setNewText(task.text);  // Reset the text to original
    };

    // Handle the delete button click with confirmation
    const handleDeleteClick = () => {
        const isConfirmed = window.confirm('Are you sure you want to delete this task?');
        if (isConfirmed) {
            onDelete(task.id);
        }
    };

    return (
        <li className="todo-item" style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
            <input
                type="checkbox"
                className="checkbox"
                checked={task.isCompleted}
                onChange={() => onToggle(task.id)}
            />
            {isEditing ? (
                <input
                    type="text"
                    value={newText}
                    onChange={(e) => setNewText(e.target.value)}
                    className="edit-input"

                />
            ) : (
                <span>{task.text}</span>
            )}

            {isEditing ? (
                <div>
                    <button onClick={handleSaveClick} className="save-button" aria-label="Save Task">
                        <i className="fas fa-save"></i> {/* Save icon */}
                    </button>
                    <button onClick={handleCancelClick} className="cancel-button" aria-label="Cancel Edit">
                        <i className="fas fa-times"></i> {/* Cancel icon */}
                    </button>
                </div>
            ) : (
                <button onClick={handleEditClick} className="edit-button" aria-label="Edit Task">
                    <i className="fas fa-edit"></i> {/* Edit icon */}
                </button>
            )}

            <button onClick={handleDeleteClick} className="delete-button" aria-label="Delete Task">
                <i className="fas fa-trash-alt"></i> {/* Delete icon */}
            </button>
        </li>
    );
};

export default TodoItem;
