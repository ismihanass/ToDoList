const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

let tasks = [];

app.post("/tasks", (req, res) => {
  const task = req.body;
  tasks.push(task);
  console.log(tasks);
  res.json({ message: "Task created", task });
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { isCompleted } = req.body;
  const task = tasks.find((t) => t.id === taskId);

  if (task) {
    task.isCompleted = isCompleted;
    console.log(tasks);
    res.json({ message: "Task updated", task });
  }
});
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  console.log(tasks);
  res.json({ message: "Task deleted" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
