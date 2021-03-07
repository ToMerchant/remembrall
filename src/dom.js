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

//let test = document.createElement('div'); //DELETE THESE
//test.setAttribute('id','highlightProject');
//content.appendChild(test);

let renderProjects = (arr) => { // added id
    projectListContainer.innerHTML = '';
    arr.forEach(element => { 
    //for(let element = 0; i <arr.length; i++){

        let projectDiv = document.createElement('div');
        let projectTitle = document.createElement('p');
        let projectDeleteButton = document.createElement('button');
        projectDeleteButton.textContent = 'X';
        projectTitle.textContent = element;
        
        projectDiv.appendChild(projectTitle);
        projectDiv.appendChild(projectDeleteButton);
        projectListContainer.appendChild(projectDiv);

        
        projectDiv.setAttribute('id', element.toString()); 
        

        if (element === arr[(arr.length -1)]){ 
            projectDiv.setAttribute('class','highlightProject');
        }
        else{
            projectDiv.setAttribute('class', 'noHighlightProject'); 
        };


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
                        //
                        projectsArray.splice(index,1);
                        
                    }
                });
                projectTitleList.forEach((element,index)=>{
                    if (element === projectDiv.id){
                        projectTitleList.splice(index,1);
                    }
                });

              
              currentProject = projectsArray[(projectsArray.length-1)];
              renderTasks(currentProject.tasksArray);
              
              //renderProjects(projectTitleList);
              renderProjects(projectTitleList);

            let addClass = document.getElementsByClassName('noHighlightProject');
            if(addClass.length > 2){
            let i = addClass.length - 2;
            addClass[i].setAttribute('class', 'highlightProject');
          
            }
            else if (addClass.length === 2) {
                let i = addClass.length - 1;
                addClass[i].setAttribute('class', 'highlightProject');

            }
            else if (addClass.length === 1) {
                let i = addClass.length - 1;
                addClass[i].setAttribute('class', 'highlightProject');
            
            }

           else if (addClass.length === 0){
               let fin = document.getElementsByClassName('highlightProject noHighlightProject');
              fin[0].setAttribute('class', 'highlightProject');
              fin[1].setAttribute('class', 'highlightProject');
           }//needd to fix for final div
            console.log(addClass)
            //MAYBBE GET CHILD ELEMENTS OF DIV???

            
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