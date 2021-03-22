//BUGS
//1. https://bscottnz.github.io/todo/ this NICE
//2. 

document.title = '⚪ Remembrall';


import { format, fromUnixTime, } from 'date-fns'
import { Task, Tasks, Project, addProjectsToStorage, submitTaskForm, submitProjectForm, switchProject, projectsArray, projectTitleList, currentProject } from './logic.js';
import{renderTasks, createTask} from './tasks.js';
import {renderProjects, createProject} from './projects.js';

let content = document.getElementById('content');

let projectContainer = document.createElement('div');
projectContainer.style.display = 'inline';
projectContainer.setAttribute('id', 'projectContainer');
content.appendChild(projectContainer);

let navButton = document.getElementById('navButton');
navButton.addEventListener('click', function () {
    if (projectContainer.style.display === 'inline') {
        projectContainer.style.display = 'none';
        renderTasks(currentProject.tasksArray);
    }
    else if (projectContainer.style.display === 'none') {
        projectContainer.style.display = 'inline';
        renderTasks(currentProject.tasksArray);
    }
});

let taskContainer = document.createElement('div');
taskContainer.setAttribute('id', 'taskContainer');
content.appendChild(taskContainer);

let projectListContainer = document.createElement('div');
projectListContainer.setAttribute('id', 'projectListContainer');
projectContainer.appendChild(projectListContainer);

let taskListContainer = document.createElement('div');
taskListContainer.setAttribute('id', 'taskListContainer');
taskContainer.appendChild(taskListContainer);

let newProjectContainer = document.createElement('div');
newProjectContainer.setAttribute('id', 'newProjectContainer');
projectContainer.appendChild(newProjectContainer);

let newTaskContainer = document.createElement('div');
newTaskContainer.setAttribute('id', 'newTaskContainer');
taskContainer.appendChild(newTaskContainer);

let newProjectButton = document.createElement('button');
newProjectButton.setAttribute('id', 'newProjectButton');
newProjectButton.innerHTML = '<i class="fas fa-plus-square"></i>';
projectContainer.appendChild(newProjectButton);

let newTaskButton = document.createElement('button');
newTaskButton.setAttribute('id', 'newTaskButton');
newTaskButton.innerHTML = '<i class="fas fa-plus-circle"></i>';
taskContainer.appendChild(newTaskButton);



newTaskButton.addEventListener('click', createTask);
newProjectButton.addEventListener('click', createProject);


export {  newProjectButton, projectListContainer }