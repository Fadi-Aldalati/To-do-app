import React, { useState, useEffect } from "react";
import { BsCheck2All } from "react-icons/bs";
import {
  saveTask,
  getTasks,
  deleteTask,
  editTask,
} from "../services/taskService";

const Main = () => {
  const [currentTask, setCurrentTask] = useState({
    title: "",
    _id: "",
  });
  const [tasks, setTasks] = useState();

  useEffect((currentTask) => {
    async function fetchData() {
      const data = await (await getTasks()).data;
      const tasks = [...data];
      setTasks(tasks);
    }
    console.log(currentTask);
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
  async function handleEdit(event) {
    event.preventDefault();
    try {
      if (currentTask.title !== "") {
        console.log(await editTask(currentTask));
        const data = await (await getTasks()).data;
        const tasks = [...data];
        setTasks(tasks);
      } else {
        console.log("Task has to be an string");
      }
    } catch (err) {
      console.log("deleting task error", err);
    }
    setCurrentTask({ title: currentTask.title, _id: "" });
  }

  function handleChange(e) {
    setCurrentTask({ title: e.target.value, _id: currentTask._id });
  }
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      if (currentTask.title !== "") {
        const demo = {
          title: currentTask.title,
        };

        const task = await (await saveTask(demo)).data;

        const newTasks = [...tasks, task];
        setTasks(newTasks);
      }
    } catch (err) {
      console.log("submiting task error", err);
    }
    event.target.reset();
    setCurrentTask({ title: "", _id: currentTask._id });
  }

  return (
    <React.Fragment>
      <div className="container" style={{ marginTop: "20px" }}>
        <h2>Add Task</h2>
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
            <button className="btn btn-primary rounded">Submit</button>
          </div>
        </form>
        <br />
        <ul className="list-group">
          {tasks?.map((task) => (
            <li
              key={task._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {currentTask._id !== task._id && task.title}
              {currentTask._id === task._id && (
                <>
                  <form onSubmit={handleEdit}>
                    <div className="input-group">
                      <div className="form-outline">
                        <input
                          style={{ width: "auto" }}
                          type="text"
                          onChange={handleChange}
                          defaultValue={task.title}
                          className="form-control"
                        />
                      </div>
                      <button className="btn btn-success rounded">
                        <BsCheck2All size={22} />
                      </button>
                    </div>
                  </form>
                </>
              )}
              <div style={{ textAlign: "right" }}>
                <button
                  type="text"
                  onClick={() =>
                    setCurrentTask({ title: currentTask.title, _id: task._id })
                  }
                  className="btn btn-primary"
                >
                  Edit
                </button>
                <button
                  type="text"
                  onClick={() => handleDelete(task)}
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
