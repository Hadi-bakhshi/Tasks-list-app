// Define UI vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-tasks');


// Load all event listener
loadEventListeners();

// Load all
function loadEventListeners() {

    // DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    
    // add task event
    form.addEventListener('submit', addTask);
    // remove task event
    taskList.addEventListener('click', removeTask)

    // clear task
    clearBtn.addEventListener('click', clearTask);

    // filter task
    filter.addEventListener('keyup', filterTask)
}

// get tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        // creat li element
        const li = document.createElement('li');
        // add class
        li.className = 'list-group-item d-flex justify-content-between';
        // create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create i element
        const i = document.createElement('i');
        // add class
        i.className = 'fas fa-times';
        // append i to li
        li.appendChild(i);
        // append li to ul
        taskList.appendChild(li);
    });
}

// add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add your task, please');
    } else {
        // creat li element
        const li = document.createElement('li');
        // add class
        li.className = 'list-group-item d-flex justify-content-between';
        // create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // create i element
        const i = document.createElement('i');
        // add class
        i.className = 'fas fa-times';
        // append i to li
        li.appendChild(i);
        // append li to ul
        taskList.appendChild(li);
        // store in LS
        storeTaskInLocalStorage(taskInput.value);
        // clear input
        taskInput.value = '';

        e.preventDefault()

    }
}

// store task
function storeTaskInLocalStorage(task) {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// remove task
function removeTask(e) {
    if (e.target.classList.contains('fas')) {
        if (confirm('Do you want to remove it?')) {
            e.target.parentElement.remove();

            // Remove from LS
            removeTaskfromLocalStorage(e.target.parentElement);
        }
    }
}

// Remove from LS
function removeTaskfromLocalStorage(taskItem){
    let tasks;
    if (localStorage.getItem('tasks')=== null){
        tasks=[];
    } else {
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task,index){
        if (taskItem.textContent===task){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// clear task 
function clearTask() {
    taskList.innerHTML = '';

    // clear from LS
    clearTasksFromLocalStorage();
}

// clear tasks from Ls
function clearTasksFromLocalStorage(){
    localStorage.clear();
}


// filter task
function filterTask(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.list-group-item').forEach(function (task) {
        const item = task.textContent;

        if (item.toLowerCase().indexOf(text) != -1) {
            task.classList.add("d-flex");
        } else {
            task.classList.remove("d-flex");
            task.style.display = 'none';
        }

    });
}
