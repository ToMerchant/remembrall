import { newProjectButton, projectListContainer } from './dom.js';
import { Task, Project, submitTaskForm, submitProjectForm, addProjectsToStorage, currentProject, switchProject, projectsArray, projectTitleList } from './logic.js';
import { renderTasks, createTask } from './tasks.js';

let createProject = () => {
    let newProjectForm = document.createElement('div');
    newProjectForm.setAttribute("id", "newProjectForm");
    newProjectContainer.appendChild(newProjectForm);

    let titleInput = document.createElement('input');
    titleInput.setAttribute("type", "text");
    titleInput.style.margin = '2px';
    titleInput.setAttribute("id", "titleInput");
    titleInput.maxLength = '10';
    newProjectForm.appendChild(titleInput);

    let formSubmitButton = document.createElement('button');
    formSubmitButton.textContent = "Submit";
    formSubmitButton.setAttribute('class', 'generalButtons');
    formSubmitButton.style.backgroundColor = 'lightgreen';
    newProjectForm.appendChild(formSubmitButton);

    let formCancelButton = document.createElement('button');
    formCancelButton.setAttribute('class', 'generalButtons');
    formCancelButton.style.backgroundColor = '#f75353';
    formCancelButton.textContent = "Cancel";

    newProjectForm.appendChild(formCancelButton);

    formCancelButton.addEventListener('click', cancelFormButton)

    newProjectButton.style.display = 'none';
    newTaskButton.style.display = 'none';

    formSubmitButton.addEventListener('click', submitProjectForm);
};

let cancelFormButton = function () {
    newProjectButton.style.display = 'inline';
    newTaskButton.style.display = 'inline';
    newProjectForm.remove();
};

let clearProjectListContainer = function () {
    projectListContainer.innerHTML = '';

}

function checkFalse(val) {
    return val === false;
}



let setBorderColor = function (projectDiv) {
    let iconArrayTest = [];

    currentProject.tasksArray.forEach(x => {
        iconArrayTest.push(x.select);
    })

    if (iconArrayTest.every(checkFalse) === true) {
        projectDiv.style.borderColor = '#1d1d2c';
    }
    else {
        projectDiv.style.borderColor = '#e40c2b';
    }
};


let setClassForProjectDiv = function (element, projectDiv) {
    if (element === currentProject.id) {
        projectDiv.setAttribute('class', 'highlightProject');
    }
    else {
        projectDiv.setAttribute('class', 'noHighlightProject');
    };
};

function switchFunction(projectDiv, element) {
    let remClass = document.getElementsByClassName('highlightProject');
    for (let i = 0; i < remClass.length; i++) {
        remClass[i].setAttribute('class', 'noHighlightProject');
    }
    projectDiv.setAttribute('class', 'highlightProject');

    switchProject(element);
};

let runDeleteProject = function (projectDiv) {
    projectsArray.forEach((element, index) => {
        if (element.id === projectDiv.id) {
            projectsArray.splice(index, 1);
        }
    });

    projectTitleList.forEach((element, index) => {
        if (element === projectDiv.id) {
            projectTitleList.splice(index, 1);

        }
    });

    currentProject = projectsArray[0];

    if (projectTitleList.length > 0) {
        renderTasks(currentProject.tasksArray);
    }
    else if (projectTitleList.length === 0) {
        document.getElementById('taskListContainer').innerHTML = '';
    }
}

let confirmDelete = function (projectDiv) {
    let confirmDelete = confirm('Are you sure you want to delete this project and it\'s tasks?');

    if (confirmDelete === true) {
        runDeleteProject(projectDiv);

        addProjectsToStorage();

        renderProjects(projectTitleList);
    }
    else { renderProjects(projectTitleList); };
}

let deleteProject = function (projectDiv) {
    projectDiv.removeEventListener('click', switchFunction);
    confirmDelete(projectDiv);
};


let displayProject = function (element) {
    let projectDiv = document.createElement('div');

    setBorderColor(projectDiv);

    setClassForProjectDiv(element, projectDiv);

    let projectTitle = document.createElement('p');
    let projectDeleteButton = document.createElement('button');
    projectDeleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    projectDeleteButton.setAttribute('class', 'projectDeleteButton');
    projectTitle.textContent = element;
    projectDiv.setAttribute('id', element.toString());
    projectDiv.appendChild(projectTitle);
    projectDiv.appendChild(projectDeleteButton);
    projectListContainer.appendChild(projectDiv);

    projectDiv.addEventListener('click', function () {
        switchFunction(projectDiv, element);
    });

    projectDeleteButton.addEventListener('click', function () {
        deleteProject(projectDiv);
    }
    );
};



let renderEachProject = function (arr) {
    arr.forEach(element => {
        displayProject(element);

    });
}

let renderProjects = (arr) => {
    clearProjectListContainer();
    //projectListContainer.innerHTML = '';
    renderEachProject(arr);
};




export { createProject, renderProjects }