"use client";

import React, { useState, useEffect } from "react";
import "./globals.css";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import CustomInput from "./components/CustomInput";

// Define a type for each todo object
interface Todo {
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

  const [todos, setTodos] = useState<Todo[]>([]);
  // const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Run once when app starts
  useEffect(() => {
    getLocalTodos();
  }, []);
  //Use Effect
  useEffect(() => {
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  //Functions
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
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
  const saveLocalTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos")!);
      setTodos(todoLocal);
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
        todos={todos}
        setTodos={setTodos}
        setFormData={setFormData}
        setStatus={setStatus}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      <TodoList
        formData={formData}
        setFormData={setFormData}
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
      />
      <div />
    </>
  );
}

export default App;
