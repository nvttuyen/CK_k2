import React, { useEffect, useState } from "react";
import "./Style.css";

export default function Homepage() {
  const [dataInput, setDataInput] = useState("");
  const [data, setData] = useState([]);

  // LocalStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("dataInput"));
    if (storedData) {
      setData(storedData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dataInput", JSON.stringify(data));
  }, [data]);

  // Check Task
  const handleChecked = (event, id) => {
    const newData = data.map((item) => {
      if (item.id === id) {
        return { ...item, status: event.target.checked };
      }
      return item;
    });
    setData(newData);
  };

  // Render Task
  const renderTask = (filterType) => {
    return data.map((item) => {
      if (
        filterType === "all" ||
        (filterType === "active" && !item.status) ||
        (filterType === "complete" && item.status)
      ) {
        let stylecss = "activeTask";
        if (item.status) {
          stylecss = "completeTask";
        }
        return (
          <div key={item.id} className={stylecss}>
            <div className="eachTask">
              <input
                checked={item.status}
                type="checkbox"
                onChange={(event) => {
                  handleChecked(event, item.id);
                }}
              />
              <span>{item.task}</span>
            </div>
            <button
              className="delete-btn"
              onClick={() => handleDelete(item.id)}
            >
              <i class="fa fa-trash-alt"></i>
            </button>
          </div>
        );
      }
      return null;
    });
  };
  // Delete task
  const handleDelete = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setData(newData);
  };
  //   Delete all task
  const handleDeleteAll = () => {
    setData([]);
  };

  // Add Task
  const addTask = () => {
    if (dataInput.trim() === "") {
      alert("Rỗng");
      return;
    }

    if (data.some((task) => task.task === dataInput.trim())) {
      alert("Trùng");
      return;
    }

    const newData = [
      ...data,
      {
        id: Math.floor(Math.random() * 100),
        task: dataInput.trim(),
        status: false,
      },
    ];

    setData(newData);
    setDataInput("");
  };

  // Handle Input Change
  const handleChange = (e) => {
    setDataInput(e.target.value);
  };

  return (
    <div className="Todoapp">
      <div className="content">
        <h1>#TO DO</h1>
        <div className="addTaskBar">
          <input
            value={dataInput}
            onChange={handleChange}
            type="text"
            placeholder="type your task"
          />
          <button
            className="nav-link-add"
            onClick={() => {
              addTask();
            }}
          >
            ADD
          </button>
        </div>
        <div>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected="true"
              >
                All
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane"
                aria-selected="false"
              >
                Active
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#contact-tab-pane"
                type="button"
                role="tab"
                aria-controls="contact-tab-pane"
                aria-selected="false"
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home-tab-pane"
              role="tabpanel"
              aria-labelledby="home-tab"
              tabIndex={0}
            >
              {renderTask("all")}
            </div>
            <div
              className="tab-pane fade"
              id="profile-tab-pane"
              role="tabpanel"
              aria-labelledby="profile-tab"
              tabIndex={0}
            >
              {renderTask("active")}
            </div>
            <div
              className="tab-pane fade"
              id="contact-tab-pane"
              role="tabpanel"
              aria-labelledby="contact-tab"
              tabIndex={0}
            >
              {renderTask("complete")}
            </div>
          </div>
        </div>
        <button
          className="deleteAll-btn"
          onClick={handleDeleteAll}
          style={{ display: data.length > 0 ? "block" : "none" }}
        >
          DELETE ALL TASK
        </button>
      </div>
    </div>
  );
}
