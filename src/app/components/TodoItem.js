// components/TodoItem.js
import React from 'react';

const TodoItem = ({ todo, onDelete, onToggleCompleted}) => {
  return (
    <div className="flex mb-4 items-center">
        <p className={todo.done ? "w-full line-through text-green-700" : "w-full text-gray-500"}>{todo.text}</p>
        {!todo.done ? 
          <button onClick={onToggleCompleted} className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white-100 text-green-500 border-green hover:border-green-200">Done</button>
        :
          <button onClick={onToggleCompleted} className="flex-no-shrink whitespace-nowrap p-2 ml-4 mr-2 border-2 rounded hover:text-white-100 text-gray-500 border-grey hover:border-gray-500">Not Done</button>
        }
        <button onClick={onDelete} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white-100 text-red-500 hover:border-red-200">Remove</button>
    </div>
  );
};

export default TodoItem;
