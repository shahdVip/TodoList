import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, onToggle, onDelete, onEdit }) => {
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
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />
                ))
            )}
        </ul>
    );
};

export default TodoList;
