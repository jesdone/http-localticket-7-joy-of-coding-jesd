"use client";

import React, { useState, useEffect } from "react";
import "./globals.css";
import Form from "./components/Form";
import TaskList from "./components/TaskList";

// Define a type for each task object
interface Task {
  title: string;
  duedate: string;
  description: string;
  completed: boolean;
}

function App() {
  //State
  const [formData, setFormData] = useState({
    title: "",
    duedate: "",
    description: "",
  });

  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState([]);

  //Run once when app starts
  useEffect(() => {
    getLocalTasks();
  }, []);
  //Use Effect
  useEffect(() => {
    filterHandler();
    saveLocalTasks();
  }, [tasks, status]);

  //Functions
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTasks(tasks.filter((task) => task.completed === true));
        break;
      case "uncompleted":
        setFilteredTasks(tasks.filter((task) => task.completed === false));
        break;
      default:
        setFilteredTasks(tasks);
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  //Save to Local
  const saveLocalTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };
  const getLocalTasks = () => {
    if (localStorage.getItem("tasks") === null) {
      localStorage.setItem("tasks", JSON.stringify([]));
    } else {
      let taskLocal = JSON.parse(localStorage.getItem("tasks")!);
      setTasks(taskLocal);
    }
  };

  return (
    <>
      <div className="App" />
      <header>
        <h1>Task List</h1>
      </header>
      <Form
        formData={formData}
        tasks={tasks}
        setTasks={setTasks}
        setFormData={setFormData}
        setStatus={setStatus}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      <TaskList
        formData={formData}
        setFormData={setFormData}
        filteredTasks={filteredTasks}
        setTasks={setTasks}
        tasks={tasks}
      />
      <div />
    </>
  );
}

export default App;
