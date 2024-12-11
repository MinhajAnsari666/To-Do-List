// DOM Elements
const taskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage
const loadTasks = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => renderTask(task));
};

// Save tasks to localStorage
const saveTasks = () => {
  const tasks = Array.from(taskList.children).map((li) => ({
    text: li.querySelector('.task-text').innerText,
    completed: li.classList.contains('completed'),
  }));
  localStorage.setItem('tasks', JSON.stringify(tasks));
};


const renderTask = (task) => {
  const li = document.createElement('li');
  li.className = task.completed ? 'completed' : '';

  const taskText = document.createElement('span');
  taskText.className = 'task-text';
  taskText.innerText = task.text;
  li.appendChild(taskText);

  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const editBtn = document.createElement('button');
  editBtn.className = 'edit';
  editBtn.innerText = 'Edit';
  editBtn.onclick = () => {
    const newText = prompt('Edit your task:', taskText.innerText);
    if (newText) {
      taskText.innerText = newText;
      saveTasks();
    }
  };
  actions.appendChild(editBtn);

  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'Delete';
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };
  actions.appendChild(deleteBtn);

  li.appendChild(actions);

  li.onclick = (e) => {
    if (e.target.tagName !== 'BUTTON') {
      li.classList.toggle('completed');
      saveTasks();
    }
  };

  taskList.appendChild(li);
};


const addTask = () => {
  const text = taskInput.value.trim();
  if (!text) {
    alert('Task cannot be empty!');
    return;
  }
  renderTask({ text, completed: false });
  taskInput.value = '';
  saveTasks();
};


addTaskBtn.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', loadTasks);
