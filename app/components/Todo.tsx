import React, { useState } from "react";
import { FaCheck, FaSave, FaEdit, FaTrash } from "react-icons/fa";

const Todo = ({ todo, todos, setTodos }) => {
  const [editedTodo, setEditedTodo] = useState({ ...todo });
  const [isEditing, setIsEditing] = useState(false);

  const deleteHandler = () => {
    setTodos(todos.filter((el: { id: any }) => el.id !== todo.id));
  };

  const completeHandler = () => {
    setTodos(
      todos.map((item: { id: any; completed: any }) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  const editHandler = () => {
    setIsEditing(true);
  };

  const saveEditHandler = () => {
    setTodos(
      todos.map((item: { id: any }) => {
        if (item.id === todo.id) {
          return {
            ...item,
            ...editedTodo,
          };
        }
        return item;
      })
    );
    setIsEditing(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="todo">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTodo.text}
            name="text"
            onChange={handleEditChange}
          />
          <input
            type="text"
            value={editedTodo.dueDate}
            name="dueDate"
            onChange={handleEditChange}
          />
          <input
            type="text"
            value={editedTodo.description}
            name="description"
            onChange={handleEditChange}
          />
        </div>
      ) : (
        <div>
          <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
            {todo.text}
          </div>
          <div>{todo.description}</div>
          <div>{todo.dueDate}</div>
        </div>
      )}
      <button onClick={completeHandler} className="complete-btn">
        {/* <i className={`fas fa-check ${todo.completed ? "completed" : ""}`}></i> */}
        <FaCheck />
      </button>
      {isEditing ? (
        <button onClick={saveEditHandler} className="edit-btn">
          {/* <i className="fas fa-save"></i> */}
          <FaSave />
        </button>
      ) : (
        <button onClick={editHandler} className="edit-btn">
          {/* <i className="fas fa-edit"></i> */}
          <FaEdit />
        </button>
      )}
      <button onClick={deleteHandler} className="trash-btn">
        {/* <i className="fas fa-trash"></i> */}
        <FaTrash />
      </button>
    </div>
  );
};

export default Todo;
