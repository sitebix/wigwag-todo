"use client"; // This is a client component
import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);
  async function getTodos() {
    const result = await axios.get(`${process.env.NEXT_PUBLIC_APP_API}/todos?sort[id]=desc`);
    console.log({result});
    setTodos(result?.data.data);
    setLoading(false);
  };
  useEffect(() => {
   getTodos();
  }, [])

  const addTodo = async(task) => {
    setLoading(true);
    await axios.post(`${process.env.NEXT_PUBLIC_APP_API}/todos`, {
      data: {
        text: task,
        done: false
      }
    });
    setTask('');
    getTodos();
  };

  const deleteTodo = async(todo) => {
    if(confirm("Do you want to delete this item?")){
      setLoading(true);
      await axios.delete(`${process.env.NEXT_PUBLIC_APP_API}/todos/${todo.id}`);
      setLoading(true);
      const newTodos = todos.filter((_todo) => _todo.id !== todo.id);
      setTodos(newTodos);
    }
    getTodos();
  };

  const toggleCompleted = async(todo) => {
    setLoading(true);
    await axios.put(`${process.env.NEXT_PUBLIC_APP_API}/todos/${todo.id}`, {
      data: {
        done: !todo.done
      }
    });
    getTodos();
  };

  const Loading = () => {
    return (
      <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-white-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    )
  }

  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
            <div className="mb-4">
                <h1 className="text-grey-darkest">WigWag Todo List</h1>
                <div className="flex mt-4">
                    <input type="text" value={task} onChange={(e) => setTask(e.target.value)} onKeyDown={(e) => {e.key === "Enter" && addTodo(task)}} className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo" />
                    <button  onClick={() => addTodo(task)} className="flex-no-shrink p-2 border-2 rounded text-teal-500 border-teal hover:border-teal-200">
                  {loading ? <Loading/> : 'Add'}</button>
                </div>
            </div>
            <div>
            {todos.map((todo, index) => (
              <TodoItem
                key={index}
                todo={todo}
                onDelete={() => deleteTodo(todo)}
                onToggleCompleted={() => toggleCompleted(todo)}
              />
            ))}
            </div>
        </div>
    </div>
  );
};

export default TodoList;
