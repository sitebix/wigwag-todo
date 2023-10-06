// components/TodoItem.js
import React from 'react';

const TodoItem = ({ todo, onDelete, onToggleCompleted }) => {
  return (
    <div className="flex mb-4 items-center">
        <p className={todo.completed ? "w-full line-through text-green" : "w-full text-grey-darkest"}>{todo.task}</p>
        {todo.completed ? 
          <button onClick={onToggleCompleted} className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green">Done</button>
        :
          <button onClick={onToggleCompleted} className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-grey border-grey hover:bg-grey">Not Done</button>
        }
        <button onClick={onDelete} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red">Remove</button>
    </div>
  );
};

export default TodoItem;
