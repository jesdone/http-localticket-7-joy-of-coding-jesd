import React from "react";
import Task from "./Task";

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
  filteredTasks: {
    id: number;
    text: string;
    dueDate: string;
    description: string;
    completed: boolean;
  }[];
}

const TaskList: React.FC<TaskProps> = ({
  task,
  tasks,
  setTasks,
  filteredTasks,
}) => {
  // const TaskList = ({ tasks, setTasks, filteredTasks }) => {
  return (
    <div className="task-container">
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <Task
            setTasks={setTasks}
            tasks={tasks}
            key={task.id}
            task={task}
            text={task.text}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
