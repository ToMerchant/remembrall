//PROBLEMS
//1. highlight not working after delete project
//2. can't delete all of the projects

import { Task, Tasks, Project, submitTaskForm, submitProjectForm, switchProject, projectsArray, projectTitleList, currentProject } from './logic.js';

content = document.getElementById('content');

let projectContainer = document.createElement('div');
projectContainer.setAttribute('id', 'projectContainer');
content.appendChild(projectContainer);

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
newProjectButton.textContent = "Add project";
projectContainer.appendChild(newProjectButton);

let newTaskButton = document.createElement('button');
newTaskButton.setAttribute('id', 'newTaskButton');
newTaskButton.textContent = "Add task";
taskContainer.appendChild(newTaskButton);


let createProject = () => {
    let newProjectForm = document.createElement('div');
    newProjectForm.setAttribute("id", "newProjectForm");
    newProjectContainer.appendChild(newProjectForm);

    let titleInput = document.createElement('input');
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "titleInput");
    newProjectForm.appendChild(titleInput);

    let formSubmitButton = document.createElement('button');
    formSubmitButton.textContent = "submit";
    newProjectForm.appendChild(formSubmitButton);

    formSubmitButton.addEventListener('click', submitProjectForm);
};

let createTask = () => {
    let newTaskForm = document.createElement('div');
    newTaskForm.setAttribute("id", "newTaskForm");
    newTaskContainer.appendChild(newTaskForm);

    let titleInput = document.createElement('input');
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "titleInput");
    newTaskForm.appendChild(titleInput);

    let formSubmitButton = document.createElement('button');
    formSubmitButton.textContent = "submit";
    newTaskForm.appendChild(formSubmitButton);

    formSubmitButton.addEventListener('click', submitTaskForm);
};



let renderProjects = (arr) => { 
    projectListContainer.innerHTML = '';
    arr.forEach(element => { 

        let projectDiv = document.createElement('div');

        if (element === currentProject.id){//arr[(arr.length -1)]){ 
            projectDiv.className = 'highlightProject';
            console.log(element);
            console.log(currentProject.id);
            console.log('ran!');
        }
        else{
            projectDiv.className = 'noHighlightProject'; 
        };

        let projectTitle = document.createElement('p');
        let projectDeleteButton = document.createElement('button');
        projectDeleteButton.textContent = 'X';
        projectTitle.textContent = element;

        projectDiv.setAttribute('id', element.toString()); 

        projectDiv.appendChild(projectTitle);
        projectDiv.appendChild(projectDeleteButton);
        projectListContainer.appendChild(projectDiv);


        projectDiv.addEventListener('click', function(){
            let remClass = document.getElementsByClassName('highlightProject');
            for (let i = 0; i < remClass.length; i++){
                remClass[i].setAttribute('class', 'noHighlightProject');
            }
            projectDiv.setAttribute('class','highlightProject');

            switchProject(element);
            
        });

        projectDeleteButton.addEventListener('click', function(){
            let confirmDelete = confirm('Are you sure you want to delete this project and its tasks?');
            if (confirmDelete === true){
                projectsArray.forEach((element, index) => {
                    if (element.id === projectDiv.id){
                        projectsArray.splice(index,1);
                    }
                });
                projectTitleList.forEach((element,index)=>{
                    if (element === projectDiv.id){
                        projectTitleList.splice(index,1);
                    }
                });
              
              currentProject = projectsArray[(projectsArray.length-1)];
              //currentProject = projectsArray[0];
              renderTasks(currentProject.tasksArray); 
              renderProjects(projectTitleList); 
         // projectListContainer.childNodes[0].className = "highlightProject";
            
            }
        });

    });
};


let renderTasks = (arr) => {
    taskListContainer.innerHTML = '';
    arr.forEach(element => { 

        let taskDiv = document.createElement('div');
        let taskTitle = document.createElement('p');
        taskTitle.textContent = element;

        taskDiv.appendChild(taskTitle);
        taskListContainer.appendChild(taskDiv);

    });
};

//pushNewTask(titleInput.value.toString());


newTaskButton.addEventListener('click', createTask);
newProjectButton.addEventListener('click', createProject);


export { renderTasks, renderProjects,  }