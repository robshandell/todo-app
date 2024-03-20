import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import ConfirmationModal from './ConfirmationModal'; 
// import logo from './src/images/lexmeet-logo.png';

export const TodoWrapper = () => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const [todos, setTodos] = useState(storedTodos);
    const [deleteId, setDeleteId] = useState(null); // State to track the ID of the task to delete
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State to manage the delete confirmation modal
    const [allCompleted, setAllCompleted] = useState(false); // State to track if all tasks are completed
    const [isDeleteAllModalOpen, setIsDeleteAllModalOpen] = useState(false); // State to manage the delete all confirmation modal

    useEffect(() => {
        // Check if all tasks are completed
        const areAllCompleted = todos.every(todo => todo.completed);
        setAllCompleted(areAllCompleted);
    }, [todos]);

    const addTodo = todo => {
        const newTodo = { id: uuidv4(), task: todo, completed: false, isEditing: false };
        const newTodos = [...todos, newTodo];
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    };

    const toggleComplete = id => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const deleteTodo = id => {
        setDeleteId(id); // Set the ID of the task to delete
        setIsDeleteModalOpen(true); // Open the delete confirmation modal
    };

    const confirmDelete = () => {
        const updatedTodos = todos.filter(todo => todo.id !== deleteId);
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setIsDeleteModalOpen(false); // Close the delete confirmation modal
        setDeleteId(null); // Reset the delete ID
    };

    const cancelDelete = () => {
        setIsDeleteModalOpen(false); // Close the delete confirmation modal
        setDeleteId(null); // Reset the delete ID
    };

    const deleteAllTasks = () => {
        setIsDeleteAllModalOpen(true); // Open the delete all confirmation modal
    };

    const confirmDeleteAll = () => {
        setTodos([]); // Delete all tasks
        localStorage.removeItem('todos'); // Remove todos from localStorage
        setIsDeleteAllModalOpen(false); // Close the delete all confirmation modal
    };

    const editTodo = (newValue, id) => {
        if (!newValue.trim()) {
            alert("Task cannot be empty!");
            return; // Prevent updating with empty value
        }
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, task: newValue, isEditing: false } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const editTask = (task, id) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, task, isEditing: true } : todo
        );
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const toggleAllComplete = () => {
        const areAllCompleted = todos.every(todo => todo.completed);
        const updatedTodos = todos.map(todo => ({ ...todo, completed: !areAllCompleted }));
        setTodos(updatedTodos);
        localStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    return (
        <div className='TodoWrapper'>
            {/* <img src="./lexmeet-logo.png" alt="Your Logo" className="logo" /> */}
            <h1>Get Things Done!</h1>
            <TodoForm addTodo={addTodo} />
            {todos.map(todo =>
                todo.isEditing ? (
                    <EditTodoForm key={todo.id} editTodo={editTodo} task={todo} />
                ) : (
                    <Todo key={todo.id} task={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTask} />
                )
            )}
            <div className="button-group">
                <button className='todo-btn done-all-btn' onClick={toggleAllComplete}>
                    {allCompleted ? 'Undone All' : 'Done All'}
                </button>
                <button className='todo-btn delete-all-btn' onClick={deleteAllTasks}>Delete All</button>
            </div>
            {/* Render the delete confirmation modal */}
            <ConfirmationModal isOpen={isDeleteModalOpen} onCancel={cancelDelete} onConfirm={confirmDelete}  />
            <ConfirmationModal isOpen={isDeleteAllModalOpen} onCancel={() => setIsDeleteAllModalOpen(false)}  onConfirm={confirmDeleteAll} message="Are you sure you want to delete all tasks?" />
        </div>
    );
};
