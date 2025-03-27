const addButton = document.getElementById('addButton');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

addButton.addEventListener('click', async () => {
  const taskText = taskInput.value;
  if (taskText) {
    await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token123',
      },
      body: JSON.stringify({ text: taskText }),
    });

    taskInput.value = '';
    loadTasks();
  }
});

async function loadTasks() {
  const response = await fetch('http://localhost:3000/tasks', {
    headers: {
      'Authorization': 'token123',
    },
  });
  const tasks = await response.json();

  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    const taskLabel = document.createElement('label');
    li.className = 'listElement';
    taskLabel.textContent = task.text;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      if (checkIdExistence(task.id)) {
        deleteTask(task.id);
      }
    });

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.isCompleted;
    checkbox.className = 'check-box';
    checkbox.addEventListener('change', () => {
      if (checkIdExistence(task.id)) {
        updateTaskStatus(task.id, checkbox.checked);
      }
    });



    li.appendChild(deleteButton);
    li.appendChild(checkbox);
    li.appendChild(taskLabel);
    taskList.appendChild(li);
  });
}

async function deleteTask(taskId) {
  await fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'token123',
    },
  });
  loadTasks();
}

function checkIdExistence(ID) {
  if (!ID || (typeof ID !== 'number' && typeof ID !== 'string')) {
    console.error('Invalid or missing Task ID');
    return false;
  }
  console.log('checked')
  return true;

}

async function updateTaskStatus(taskId, isCompleted) {
  await fetch(`http://localhost:3000/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'token123',
    },
    body: JSON.stringify({ isCompleted }),
  });
}

loadTasks();
