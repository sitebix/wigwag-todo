"use client"; // This is a client component
import React, { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const addTodo = () => {
    if (task.trim() !== '') {
      setTodos([...todos, { task, completed: false }]);
      setTask('');
    }
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const toggleCompleted = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
            <div className="mb-4">
                <h1 className="text-grey-darkest">WigWag Todo List</h1>
                <div className="flex mt-4">
                    <input type="text" value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={(e) => {e.key === "Enter" ? addTodo() : ""}} className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
                    <button  onClick={addTodo} className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
                </div>
            </div>
            <div>
            {todos.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo}
                onDelete={() => deleteTodo(index)}
                onToggleCompleted={() => toggleCompleted(index)}
              />
            ))}
            </div>
        </div>
    </div>
  );
};

export default TodoList;
