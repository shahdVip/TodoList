import React, { useState } from 'react';

const TodoItem = ({ task, onDelete, onToggle, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(task.text);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onEdit(task.id, newText);
        setIsEditing(false);
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
                <button onClick={handleSaveClick} className="save-button">
                    <i className="fas fa-save"></i> {/* Save icon */}
                </button>
            ) : (
                <button onClick={handleEditClick} className="edit-button">
                    <i className="fas fa-edit"></i> {/* Edit icon */}
                </button>
            )}
            <button onClick={() => onDelete(task.id)} className="delete-button">
                <i className="fas fa-trash-alt"></i> {/* Delete icon */}
            </button>
        </li>
    );
};

export default TodoItem;
