import React, { useState, useEffect } from "react";
import { saveTask, getTasks, deleteTask } from "../services/taskService";

const Main = () => {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState();
  /*   constructor(props) {
        super(props);
    
        this.state = {
            title:"",
            tasks:[]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    */

  useEffect(() => {
    async function fetchData() {
      const data = await (await getTasks()).data;
      console.log(data);
      const tasks = [...data];
      setTasks(tasks);
    }
    fetchData();
  }, []);

  async function handleDelete(task) {
    const newTasks = tasks.filter((m) => m._id !== task._id);
    setTasks(newTasks);
    try {
      await deleteTask(task._id);
    } catch (err) {
      console.log("deleting task error", err);
    }
  }

  function handleChange(e) {
    setTitle(e.target.value);
  }
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (title !== "") {
        console.log(title);
        const demo = {
          title: title,
        };

        const task = await (await saveTask(demo)).data;

        const newTasks = [...tasks, task];
        console.log(newTasks);
        setTasks(newTasks);
      }
    } catch (err) {
      console.log("submiting task error", err);
    }
    event.target.reset();
    setTitle("");
  }

  return (
    <React.Fragment>
      <div className="container" style={{ marginTop: "20px" }}>
        <h2>Add Item</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="form-outline">
              <input
                type="text"
                onChange={handleChange}
                placeholder="Type here..."
                className="form-control"
              />
            </div>
            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
        <br />
        <ul className="list-group">
          {tasks?.map((task) => (
            <li
              key={task._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {task.title}
              <div style={{ textAlign: "right" }}>
                <button
                  type="text"
                  onClick={()=>handleDelete(task)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Main;
