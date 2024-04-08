import React, { useState } from "react";
import { FaCheck, FaSave, FaEdit, FaTrash } from "react-icons/fa";

interface TaskProps {
  task: {
    id: number;
    text: string;
    dueDate: string;
    description: string;
    completed: boolean;
  };
  tasks: {
    id: number;
    text: string;
    dueDate: string;
    description: string;
    completed: boolean;
  }[];
  setTasks: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        text: string;
        dueDate: string;
        description: string;
        completed: boolean;
      }[]
    >
  >;
}

const Task: React.FC<TaskProps> = ({ task, tasks, setTasks }) => {
  // const Task = ({ task, tasks, setTasks }) => {
  const [editedTask, setEditedTask] = useState({ ...task });
  const [isEditing, setIsEditing] = useState(false);

  const deleteHandler = () => {
    setTasks(tasks.filter((el) => el.id !== task.id));
  };

  const completeHandler = () => {
    setTasks(
      tasks.map((item) => {
        if (item.id === task?.id) {
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
    setTasks(
      tasks.map((item) => {
        if (item.id === task.id) {
          return {
            ...item,
            ...editedTask,
          };
        }
        return item;
      })
    );
    setIsEditing(false);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="task">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTask.text}
            name="text"
            onChange={handleEditChange}
          />
          <input
            type="text"
            value={editedTask.dueDate}
            name="dueDate"
            onChange={handleEditChange}
          />
          <input
            type="text"
            value={editedTask.description}
            name="description"
            onChange={handleEditChange}
          />
        </div>
      ) : (
        <div>
          <div className={`task-item ${task?.completed ? "completed" : ""}`}>
            {task?.text}
          </div>
          <div>{task?.description}</div>
          <div>{task?.dueDate}</div>
        </div>
      )}
      <button onClick={completeHandler} className="complete-btn">
        <FaCheck />
      </button>
      {isEditing ? (
        <button onClick={saveEditHandler} className="edit-btn">
          <FaSave />
        </button>
      ) : (
        <button onClick={editHandler} className="edit-btn">
          <FaEdit />
        </button>
      )}
      <button onClick={deleteHandler} className="trash-btn">
        <FaTrash />
      </button>
    </div>
  );
};

export default Task;
