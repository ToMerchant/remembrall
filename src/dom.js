//BUGS
//1. https://bscottnz.github.io/todo/ this NICE
import { format, fromUnixTime,} from 'date-fns'
import { Task, Tasks, Project, submitTaskForm, submitProjectForm, switchProject, projectsArray, projectTitleList, currentProject } from './logic.js';

// const today =format(new Date(),'dd.MM.yyyy');
// console.log(today);

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
    if (projectsArray.length < 1) {
        alert('You must create a new project before you submit a new task.');
    }
    else {
        let newTaskForm = document.createElement('form');
        newTaskForm.setAttribute("id", "newTaskForm");
        newTaskContainer.appendChild(newTaskForm);

        let titleInput = document.createElement('input');
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("id", "titleInput");
        titleInput.placeholder = 'Title';
        newTaskForm.appendChild(titleInput);

        let setPriority = document.createElement('select');
        setPriority.setAttribute("id", "setPriority");
        let lowPriority = document.createElement('option');
        let mediumPriority = document.createElement('option');
        let highPriority = document.createElement('option');
        lowPriority.text = 'Low priority';
        mediumPriority.text = 'Medium priority';
        highPriority.text = 'High priority';
        setPriority.add(lowPriority);
        setPriority.add(mediumPriority);
        setPriority.add(highPriority);
        newTaskForm.appendChild(setPriority);

        let setDate = document.createElement('input');
        setDate.setAttribute('type', 'date');
        setDate.setAttribute('id', 'setDate');
        newTaskForm.appendChild(setDate);

        let formSubmitButton = document.createElement('button');
        formSubmitButton.textContent = "submit";
        newTaskForm.appendChild(formSubmitButton);

        let lineBreak = document.createElement('br');
        newTaskForm.appendChild(lineBreak);

        let notesArea = document.createElement('textarea');
        notesArea.setAttribute("type", "text");
        notesArea.rows = 6;
        notesArea.cols = 60;
        notesArea.setAttribute("id", "notesArea");
        notesArea.placeholder = 'Notes...';
        newTaskForm.appendChild(notesArea);



        formSubmitButton.addEventListener('click', submitTaskForm);
    }
};



let renderProjects = (arr) => {
    projectListContainer.innerHTML = '';
    arr.forEach(element => {

        let projectDiv = document.createElement('div');

        if (element === currentProject.id) {//arr[(arr.length -1)]){ 
            projectDiv.className = 'highlightProject';
        }
        else {
            projectDiv.className = 'noHighlightProject';
        };

        let projectTitle = document.createElement('p');
        let projectDeleteButton = document.createElement('button');
        projectDeleteButton.textContent = 'x';
        projectDeleteButton.className = 'projectDeleteButton';
        projectTitle.textContent = element;

        projectDiv.setAttribute('id', element.toString());

        projectDiv.appendChild(projectTitle);
        projectDiv.appendChild(projectDeleteButton);
        projectListContainer.appendChild(projectDiv);

        function switchFunction() {
            let remClass = document.getElementsByClassName('highlightProject');
            for (let i = 0; i < remClass.length; i++) {
                remClass[i].setAttribute('class', 'noHighlightProject');
            }
            projectDiv.setAttribute('class', 'highlightProject');

            switchProject(element);
        };

        projectDiv.addEventListener('click', switchFunction);


        projectDeleteButton.addEventListener('click', function () {
            projectDiv.removeEventListener('click', switchFunction);
            let confirmDelete = confirm('Are you sure you want to delete this project and it\'s tasks?');
            if (confirmDelete === true) {
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

                //currentProject = projectsArray[(projectsArray.length-1)];
                currentProject = projectsArray[0];
                if (projectTitleList.length > 0) {
                    renderTasks(currentProject.tasksArray);
                }
                else if (projectTitleList.length === 0) {
                    document.getElementById('taskListContainer').innerHTML = '';
                }
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
        taskDiv.setAttribute('class', 'taskDiv');
        taskDiv.setAttribute('id', element.title);
        taskListContainer.appendChild(taskDiv);

        let taskCheckbox = document.createElement('input');
        taskCheckbox.setAttribute("type", "checkbox");
        taskCheckbox.setAttribute('id', 'taskCheckbox');
     

        taskDiv.appendChild(taskCheckbox);
        taskCheckbox.addEventListener('click', function () {
 
            element.checked ? (element.checked = false) : (element.checked = true);
            renderTasks(currentProject.tasksArray);
 
        });

        let taskTitle = document.createElement('p');
        taskTitle.setAttribute('id', 'taskTitle')
        taskTitle.textContent = element.title;
        taskDiv.appendChild(taskTitle);

        
        let taskDate = document.createElement('div');
        if(element.date.length>0){
        taskDate.setAttribute('id', 'taskDate');
        let taskDateObject = new Date(element.date);
        let taskDateWeekday = format(taskDateObject, 'EEE')
        let taskDateMonth= format(taskDateObject, 'MMMM');
        let taskDateDay = format(taskDateObject, 'do');
        taskDate.textContent = `${taskDateWeekday} ${taskDateDay} ${taskDateMonth} `;
        }
        else{taskDate.textContent = ''};
        taskDiv.appendChild(taskDate);

        let taskViewNotesButton = document.createElement('button');
        taskViewNotesButton.textContent = '👁️';
        taskDiv.appendChild(taskViewNotesButton);

        let notesAreaView = document.createElement('textarea');
            notesAreaView.setAttribute("type", "text");
            notesAreaView.rows = 6;
            notesAreaView.cols = 60;
            // notesAreView.setAttribute("id", "notesAreaView");
            notesAreaView.value = element.notes;
            notesAreaView.style.display = 'none';
            

        taskViewNotesButton.addEventListener('click', function () {
            
            if (notesAreaView.style.display === 'none'){
                notesAreaView.style.display = 'flex';
            }
            else{
                notesAreaView.style.display = 'none';
            }
        })
        

        let taskEditButton = document.createElement('button')
        taskEditButton.textContent = '📝';
        taskEditButton.className = 'taskEditButton'
        taskDiv.appendChild(taskEditButton);

        taskEditButton.addEventListener('click', function () {
            let notesAreaEdit = document.createElement('textarea');
            notesAreaEdit.setAttribute("type", "text");
            notesAreaEdit.rows = 6;
            notesAreaEdit.cols = 60;
            notesAreaEdit.setAttribute("id", "notesAreaEdit");
            notesAreaEdit.value = element.notes;
            taskDiv.appendChild(notesAreaEdit);

            taskCheckbox.style.display = 'none';
            taskViewNotesButton.style.display = 'none';
            taskEditButton.style.display = 'none';
            taskDeleteButton.style.display = 'none';

            taskTitle.remove();
            let taskEditTitle = document.createElement('input');
            taskEditTitle.setAttribute("type", "text");
            //taskEditTitle.placeholder = 'Notes...';
            taskEditTitle.value = element.title;
            taskDiv.insertBefore(taskEditTitle, taskEditButton);

            taskDate.remove(); //tk
            let taskDateEdit = document.createElement('input');
            taskDateEdit.setAttribute('type', 'date');
            taskDateEdit.setAttribute('id', 'taskDateEdit');
            taskDateEdit.value = element.date;
            taskDiv.insertBefore(taskDateEdit, taskEditButton);

            let updateTaskButton = document.createElement('button');
            updateTaskButton.textContent = 'Update';
            taskDiv.appendChild(updateTaskButton);

            let cancelTaskButton = document.createElement('button');
            cancelTaskButton.textContent = 'Cancel';
            taskDiv.appendChild(cancelTaskButton);

            let setPriority = document.createElement('select');
            //setPriority.setAttribute("id", "setPriority");
            let lowPriority = document.createElement('option');
            let mediumPriority = document.createElement('option');
            let highPriority = document.createElement('option');
            lowPriority.text = 'Low priority';
            mediumPriority.text = 'Medium priority';
            highPriority.text = 'High priority';
            setPriority.add(lowPriority);
            setPriority.add(mediumPriority);
            setPriority.add(highPriority);
            taskDiv.insertBefore(setPriority, taskEditButton);

            updateTaskButton.addEventListener('click', function () {
                element.notes = notesAreaEdit.value;
                element.title = taskEditTitle.value;
                element.priority = setPriority.value;
                element.date = taskDateEdit.value;
                renderTasks(currentProject.tasksArray);

                taskCheckbox.style.display = 'inline';
                taskViewNotesButton.style.display = 'inline';
                taskEditButton.style.display = 'inline';
                taskDeleteButton.style.display = 'inline';
            });

            cancelTaskButton.addEventListener('click', function () {
                renderTasks(currentProject.tasksArray);

                taskCheckbox.style.display = 'inline';
                taskViewNotesButton.style.display = 'inline';
                taskEditButton.style.display = 'inline';
                taskDeleteButton.style.display = 'inline';
            });

        })

        let taskDeleteButton = document.createElement('button')
        taskDeleteButton.textContent = 'x';
        taskDeleteButton.className = 'taskDeleteButton'
        taskDiv.appendChild(taskDeleteButton);
        taskDiv.appendChild(notesAreaView);


        taskDeleteButton.addEventListener('click', function () {
            //  taskDiv.removeEventListener('click', switchFunction); need to add this

            currentProject.tasksArray.forEach((i, index) => {
                if (i.title === taskDiv.id) {
                    currentProject.tasksArray.splice(index, 1);
                    renderTasks(currentProject.tasksArray);
                }
            });
        });
        if (element.checked === false) {
            taskTitle.style.color = 'black';
            taskTitle.style.textDecoration = 'none';
            taskCheckbox.checked = false;
        }
        else {
            taskTitle.style.color = 'grey';
            taskTitle.style.textDecoration = 'line-through';
            taskCheckbox.checked = true;

            taskDeleteButton.style.color = 'grey';
            taskEditButton.style.color = 'grey';
            //taskCheckbox.style.textDecoration = 'line-through';
        };

        if (element.checked === true) {
            taskDiv.style.borderColor = 'grey';
        }
        else {
            if (element.priority === 'Low priority') {
                taskDiv.style.borderColor = '#1e90ff';
            }
            else if (element.priority === 'Medium priority') {
                taskDiv.style.borderColor = 'orange';
            }
            else {
                taskDiv.style.borderColor = 'red';
            }
        };

    });
};





newTaskButton.addEventListener('click', createTask);
newProjectButton.addEventListener('click', createProject);


export { renderTasks, renderProjects, newProjectButton }