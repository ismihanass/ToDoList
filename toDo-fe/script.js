const addButton = document.getElementById("addButton");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addButton.addEventListener("click", async () => {
  const taskText = taskInput.value;
  if (taskText) {
    const task = { text: taskText, isCompleted: false, id: Date.now() };

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await response.json();
    taskInput.value = "";
    loadTasks();
  }
});

async function loadTasks() {
  const response = await fetch("http://localhost:3000/tasks");
  const tasks = await response.json();

  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    const taskLabel = document.createElement("label");
    taskLabel.textContent = task.text;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.isCompleted;
    checkbox.addEventListener("change", () =>
      updateTaskStatus(task.id, checkbox.checked)
    );

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(deleteButton);
    li.appendChild(checkbox);
    li.appendChild(taskLabel);
    taskList.appendChild(li);
  });
}
async function deleteTask(taskId) {
  const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: "DELETE",
  });
  loadTasks();
}

async function updateTaskStatus(taskId, isCompleted) {
  const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isCompleted }),
  });

  const data = await response.json();
}
loadTasks();
