import React from "react";
import Task from "./Task";

const TaskList = ({ tasks, setTasks, filteredTasks }) => {
  return (
    <div className="task-container">
      <ul className="task-list">
        {filteredTasks.map(
          (task: { id: React.Key | null | undefined; text: any }) => (
            <Task
              setTasks={setTasks}
              tasks={tasks}
              key={task.id}
              todo={task}
              text={task.text}
            />
          )
        )}
      </ul>
    </div>
  );
};

export default TaskList;
