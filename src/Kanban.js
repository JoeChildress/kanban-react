import { useState } from "react";

export default function Kanban() {
  const buckets = ["Backlog", "To Do", "Ongoing", "Done"];
  const bucketList = [];

  for (let i = 0; i < buckets.length; i++) {
    bucketList.push([]);
  }

  const [tasks, setTasks] = useState([
    { name: "Task 1", index: 0 },
    { name: "Task 2", index: 0 }
  ]);

  //add tasks into bucketList arrays
  tasks.forEach((task) => {
    bucketList[task.index].push(task);
  });

  function handleSubmit() {
    const textField = document.querySelector("#task-form");
    const fieldVal = textField.value;

    if (!fieldVal) return;

    //check for duplicate
    const isDuplicate = tasks.some((task) => {
      return task.name.toLowerCase() === fieldVal.toLowerCase();
    });

    if (isDuplicate) return;

    const newTask = {
      name: fieldVal,
      index: 0
    };

    setTasks([...tasks, newTask]);
    textField.value = "";
  }

  function handleMoveClick(e, currentTask) {
    const updatedTasks = tasks.map((task) => {
      if (task.name === currentTask.name) {
        if (e.target.className === "task-button-forward") {
          task.index = task.index + 1;
        }
        if (e.target.className === "task-button-back") {
          task.index = task.index - 1;
        }
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  function handleDeleteClick(task) {
    const updatedTasks = tasks.filter(
      (currentTask) => currentTask.name !== task.name
    );
    setTasks(updatedTasks);
  }

  return (
    <section id="kanban-container">
      <h1>Kanban Example</h1>
      <div id="form">
        <input
          type="text"
          id="task-form"
          placeholder="Enter a new task"
          maxlength="10"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div id="buckets-container">
        {bucketList.map((bucket, index) => {
          return (
            <div className="card-container">
              <div className="bucket-title">{buckets[index]}</div>
              {bucket.map((task) => {
                return (
                  <div className="task-card">
                    <span className="task-text">{task.name}</span>
                    <span className="task-button-container">
                      <button
                        className="task-button-back"
                        disabled={index === 0 ? "true" : ""}
                        onClick={(e) => handleMoveClick(e, task)}
                        title="back"
                      >
                        ⬅️
                      </button>
                      <button
                        className="task-button-forward"
                        disabled={index === buckets.length - 1 ? "true" : ""}
                        onClick={(e) => handleMoveClick(e, task)}
                        title="forward"
                      >
                        ➡️
                      </button>
                      <button
                        className="task-button-delete"
                        onClick={() => handleDeleteClick(task)}
                        title="delete task"
                      >
                        🗑️
                      </button>
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
