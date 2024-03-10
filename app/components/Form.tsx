import React, { useState } from "react";
import CustomInput from "./CustomInput";

const Form = ({ todos, setTodos, setStatus }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const formDataHandler = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submitTodoHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        text: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
        completed: false,
        id: Math.random() * 1000,
      },
    ]);
    setFormData({
      title: "",
      description: "",
      dueDate: "",
    });
  };

  const statusHandler = (e: { target: { value: any } }) => {
    setStatus(e.target.value);
  };

  return (
    <main>
      <form onSubmit={submitTodoHandler}>
        <CustomInput
          onChange={formDataHandler}
          value={formData.title}
          type={"text"}
          name="title"
          placeholder={"Title"}
        />
        <CustomInput
          onChange={formDataHandler}
          value={formData.dueDate}
          type={"text"}
          name="dueDate"
          placeholder={"Due Date"}
        />
        <CustomInput
          onChange={formDataHandler}
          value={formData.description}
          type={"text"}
          name="description"
          placeholder={"Description"}
        />
        <button className="todo-button" type="submit">
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select onChange={statusHandler} name="todos" className="filter-todo">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>
    </main>
  );
};

export default Form;
