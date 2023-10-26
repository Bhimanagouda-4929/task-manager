// Load tasks from local storage on page load
 window.addEventListener('load', loadTasks);

 function loadTasks() {
     const taskList = document.getElementById('taskList');
     taskList.innerHTML = '';

     const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

     tasks.forEach(task => {
         addTaskToUI(task);
     });
 }

 function addTask() {
     const taskInput = document.getElementById('taskInput');
     const taskText = taskInput.value.trim();

     if (taskText === '') {
         alert('Please enter a task.');
         return;
     }

     const task = { text: taskText, completed: false };
     addTaskToUI(task);

     // Save task to local storage
     const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
     tasks.push(task);
     localStorage.setItem('tasks', JSON.stringify(tasks));

     taskInput.value = '';
 }

 function addTaskToUI(task) {
     const taskList = document.getElementById('taskList');
     const taskItem = document.createElement('li');

     const checkbox = document.createElement('input');
     checkbox.type = 'checkbox';
     checkbox.checked = task.completed;
     checkbox.addEventListener('change', function() {
         task.completed = this.checked;
         updateLocalStorage();
     });

     const editButton = document.createElement('button');
     editButton.innerText = 'Edit';
     editButton.addEventListener('click', function() {
         editTask(task, taskItem);
     });

     const deleteButton = document.createElement('button');
     deleteButton.innerText = 'Delete';
     deleteButton.addEventListener('click', function() {
         deleteTask(task, taskItem);
     });

     taskItem.appendChild(checkbox);
     taskItem.appendChild(document.createTextNode(task.text));
     taskItem.appendChild(editButton);
     taskItem.appendChild(deleteButton);
     taskList.appendChild(taskItem);
 }

 function editTask(task, taskItem) {
     const newText = prompt('Edit task:', task.text);
     if (newText !== null) {
         task.text = newText;
         taskItem.childNodes[1].textContent = task.text;
         updateLocalStorage();
     }
 }

 function deleteTask(task, taskItem) {
     const confirmed = confirm('Are you sure you want to delete this task?');
     if (confirmed) {
         taskItem.remove();
         const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
         const index = tasks.findIndex(t => t.text === task.text);
         if (index !== -1) {
             tasks.splice(index, 1);
             updateLocalStorage();
         }
     }
 }

 function updateLocalStorage() {
     const tasks = Array.from(document.querySelectorAll('li')).map(item => {
         return {
             text: item.childNodes[1].textContent,
             completed: item.childNodes[0].checked
         };
     });

     localStorage.setItem('tasks', JSON.stringify(tasks));
 }
 