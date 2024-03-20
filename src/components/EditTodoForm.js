import React, { useState } from 'react';

export const EditTodoForm = ({ editTodo, task }) => {
    const [value, setValue] = useState(task.task);

    const handleSubmit = e => {
        e.preventDefault();
        if (!value.trim()) {
            alert("Task cannot be empty!");
            return; 
        }
        editTodo(value, task.id);
    };

    const handleFocus = () => {
        setValue(''); // Clear the value when focused
    };

    return (
        <form className='TodoForm' onSubmit={handleSubmit}>
            <input
                type="text"
                className='todo-input'
                value={value}
                placeholder=''
                onChange={(e) => setValue(e.target.value)}
                onFocus={handleFocus} 
            />
            <button type='submit' className='todo-btn'>Update Task</button>
        </form>
    );
};
