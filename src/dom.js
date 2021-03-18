//BUGS
//1. https://bscottnz.github.io/todo/ this NICE
//2. 

document.title = '⚪ Remembrall';


import { format, fromUnixTime, } from 'date-fns'
import { Task, Tasks, Project, addProjectsToStorage, submitTaskForm, submitProjectForm, switchProject, projectsArray, projectTitleList, currentProject } from './logic.js';



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


let createProject = () => {
    let newProjectForm = document.createElement('div');
    newProjectForm.setAttribute("id", "newProjectForm");
    newProjectContainer.appendChild(newProjectForm);

    let titleInput = document.createElement('input');
    titleInput.setAttribute("type", "text");
    titleInput.style.margin ='2px';
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

    formCancelButton.addEventListener('click', function () {
        newProjectButton.style.display = 'inline';
        newTaskButton.style.display = 'inline';
        //renderTasks(currentProject.tasksArray);
        newProjectForm.remove();
    })

    newProjectButton.style.display = 'none';
    newTaskButton.style.display = 'none';

    formSubmitButton.addEventListener('click', submitProjectForm);
};

let createTask = () => {
    if (projectsArray.length < 1) {
        alert('You must create a new project before you submit a new task.');
    }
    else {
        let newTaskForm = document.createElement('form');
        newTaskForm.setAttribute("id", "newTaskForm");
        newTaskForm.style.backgroundColor ='#eee';
        newTaskContainer.appendChild(newTaskForm);
        newTaskForm.style.radius ='15px';

        let titleInput = document.createElement('input');
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("id", "titleInput");
        titleInput.style.margin ='2px';
        titleInput.placeholder = 'Title';
        newTaskForm.appendChild(titleInput);

        let setPriority = document.createElement('select');
        setPriority.setAttribute("id", "setPriority");
        setPriority.style.margin ='2px';
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
        setDate.style.margin ='2px';
        setDate.setAttribute('id', 'setDate');
        newTaskForm.appendChild(setDate);

        let formSubmitButton = document.createElement('button');
        formSubmitButton.textContent = "Submit";
        formSubmitButton.setAttribute('class', 'generalButtons');
        formSubmitButton.style.backgroundColor = 'lightgreen';
        newTaskForm.appendChild(formSubmitButton);

        let formCancelButton = document.createElement('button');
        formCancelButton.textContent = "Cancel";
        formCancelButton.setAttribute('class', 'generalButtons');
        formCancelButton.style.backgroundColor = '#f75353';
        newTaskForm.appendChild(formCancelButton);

        formCancelButton.addEventListener('click', function () {
            newProjectButton.style.display = 'inline';
            newTaskButton.style.display = 'inline';
            renderTasks(currentProject.tasksArray);
            newTaskForm.remove();
        })

        let lineBreak = document.createElement('br');
        newTaskForm.appendChild(lineBreak);

        let notesArea = document.createElement('textarea');
        notesArea.setAttribute("type", "text");
        notesArea.setAttribute('id','notesArea');
        notesArea.rows = 6;
        notesArea.cols = 60;
        notesArea.setAttribute("id", "notesArea");
        notesArea.placeholder = 'Notes...';
        newTaskForm.appendChild(notesArea);

        newProjectButton.style.display = 'none';
        newTaskButton.style.display = 'none';

        formSubmitButton.addEventListener('click', submitTaskForm);



    }
};



let renderProjects = (arr) => {
    projectListContainer.innerHTML = '';
    arr.forEach(element => {

        let projectDiv = document.createElement('div');


        function checkFalse(val) {
            return val === false;
        }
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



        if (element === currentProject.id) {
            projectDiv.className = 'highlightProject';
        }
        else {
            projectDiv.className = 'noHighlightProject';
        };

        let projectTitle = document.createElement('p');
        let projectDeleteButton = document.createElement('button');
        projectDeleteButton.innerHTML = '<i class="fas fa-trash"></i>';
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


                currentProject = projectsArray[0];
                if (projectTitleList.length > 0) {
                    renderTasks(currentProject.tasksArray);
                }
                else if (projectTitleList.length === 0) {
                    document.getElementById('taskListContainer').innerHTML = '';
                }

                addProjectsToStorage();

                renderProjects(projectTitleList);




            }
            else { renderProjects(projectTitleList); }; // tk this
        });
    });
};


let renderTasks = (arr) => {
    taskListContainer.innerHTML = '';

    if (projectContainer.style.display === 'none') {
        let taskHeader = document.createElement('div');
        taskHeader.textContent = currentProject.title;
        taskHeader.setAttribute('id', 'taskHeader');
        taskListContainer.appendChild(taskHeader);
    };

    function checkFalse(val) {
        return val === false;
    }
    let icon = document.getElementById('icon');
    icon.textContent = '⚪🔴';
    let iconArrayTest = [];
    projectsArray.forEach(element => {
        element.tasksArray.forEach(x => {
            iconArrayTest.push(x.select);
        })

    });
    if (iconArrayTest.every(checkFalse) === true) {
        icon.textContent = '⚪';
        document.title = '⚪ Remembrall';


    }
    else {
        icon.textContent = '🔴';
        document.title = '🔴 Remembrall';
        //  document.getElementsByClassName('highlightProject')[0].style.borderColor = '#e40c2b';
    }

    arr.forEach(element => {


        let taskDiv = document.createElement('div');
        taskDiv.setAttribute('class', 'taskDiv');
        taskDiv.setAttribute('id', element.title);
        //taskListContainer.appendChild(taskDiv);
        taskListContainer.appendChild(taskDiv);

        let selectTask = function () {
            if (element.select === true) {
                element.select = false;
                document.title = '⚪ Remembrall';

            }
            else {

                projectsArray.forEach(element => {
                    element.tasksArray.forEach(x => {
                        x.select = false;

                    })
                })
                element.select = true;


            }
            renderTasks(currentProject.tasksArray);

            renderProjects(projectTitleList);
        };

        let taskBall = document.createElement('button');
        taskBall.setAttribute('class', 'taskBall');
        if (element.select === true) {
            taskBall.textContent = '🔴';
            // taskBall.backgroundColor = '#eee';
            // document.title = '⚪ Remembrall';
        }
        else {
            taskBall.textContent = '⭕';
            //document.title = '🔴 Remembrall';
        }
        taskDiv.appendChild(taskBall);
        taskBall.addEventListener('click', selectTask)




        //tk

        let taskCheckbox = document.createElement('input');
        taskCheckbox.setAttribute("type", "checkbox");
        taskCheckbox.setAttribute('id', 'taskCheckbox');



        taskCheckbox.addEventListener('click', function () {

            element.checked ? (element.checked = false) : (element.checked = true);
            renderTasks(currentProject.tasksArray);

        });

        let taskTitle = document.createElement('p');
        taskTitle.setAttribute('id', 'taskTitle')
        taskTitle.textContent = element.title;
        taskDiv.appendChild(taskTitle);


        let taskDate = document.createElement('div');
        if (element.date.length > 0) {
            taskDate.setAttribute('id', 'taskDate');
            let taskDateObject = new Date(element.date);
            let taskDateWeekday = format(taskDateObject, 'EEE')
            let taskDateMonth = format(taskDateObject, 'MMMM');
            let taskDateDay = format(taskDateObject, 'do');
            taskDate.textContent = `${taskDateWeekday} ${taskDateDay} ${taskDateMonth} `;
        }
        else { taskDate.textContent = '' };
        taskDiv.appendChild(taskDate);

        let taskViewNotesButton = document.createElement('button');
        taskViewNotesButton.setAttribute('class', 'taskViewNotesButton');
        taskViewNotesButton.innerHTML = '<i class="fas fa-clipboard"></i>';
        taskDiv.appendChild(taskViewNotesButton);



        let notesAreaView = document.createElement('textarea');
        notesAreaView.setAttribute("type", "text");
        notesAreaView.setAttribute('id','notesAreaView');
        notesAreaView.rows = 6;
        notesAreaView.cols = 60;
        notesAreaView.value = element.notes;
        notesAreaView.style.display = 'none';



        taskViewNotesButton.addEventListener('click', function () {

            if (notesAreaView.style.display === 'none') {
                notesAreaView.style.display = 'flex';
            }
            else {
                notesAreaView.style.display = 'none';
            }
        })


        let taskEditButton = document.createElement('button')
        taskEditButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        taskEditButton.className = 'taskEditButton'
        taskDiv.appendChild(taskEditButton);

        taskEditButton.addEventListener('click', function () {
            newProjectButton.style.display = 'none';
            newTaskButton.style.display = 'none';
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
            taskEditTitle.value = element.title;
            taskDiv.insertBefore(taskEditTitle, taskEditButton);

            taskDate.remove();
            let taskDateEdit = document.createElement('input');
            taskDateEdit.setAttribute('type', 'date');
            taskDateEdit.setAttribute('id', 'taskDateEdit');
            taskDateEdit.value = element.date;
            taskDiv.insertBefore(taskDateEdit, taskEditButton);

            let updateTaskButton = document.createElement('button');
            updateTaskButton.textContent = 'Update';
            updateTaskButton.setAttribute('class', 'generalButtons');
            updateTaskButton.style.backgroundColor = 'lightgreen';
            taskDiv.appendChild(updateTaskButton);

            let cancelTaskButton = document.createElement('button');
            cancelTaskButton.textContent = 'Cancel';
            
            cancelTaskButton.setAttribute('class', 'generalButtons');
            cancelTaskButton.style.backgroundColor = '#f75353';
            taskDiv.appendChild(cancelTaskButton);

            let setPriority = document.createElement('select');
            let lowPriority = document.createElement('option');
            let mediumPriority = document.createElement('option');
            let highPriority = document.createElement('option');
            lowPriority.text = 'Low priority';
            mediumPriority.text = 'Medium priority';
            highPriority.text = 'High priority';
            setPriority.add(lowPriority);
            setPriority.add(mediumPriority);
            setPriority.add(highPriority);
            setPriority.value = element.priority;
            taskDiv.insertBefore(setPriority, taskEditButton);

            updateTaskButton.addEventListener('click', function () {
                newProjectButton.style.display = 'inline';
                newTaskButton.style.display = 'inline';
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
                newProjectButton.style.display = 'inline';
                newTaskButton.style.display = 'inline';
                renderTasks(currentProject.tasksArray);

                taskCheckbox.style.display = 'inline';
                taskViewNotesButton.style.display = 'inline';
                taskEditButton.style.display = 'inline';
                taskDeleteButton.style.display = 'inline';
            });

            addProjectsToStorage();

        })

        let taskDeleteButton = document.createElement('button')
        taskDeleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        taskDeleteButton.className = 'taskDeleteButton'
        taskDiv.appendChild(taskDeleteButton);
        taskDiv.appendChild(taskCheckbox);
        taskDiv.appendChild(taskBall);
        taskDiv.appendChild(notesAreaView);


        taskDeleteButton.addEventListener('click', function () {
            //  taskDiv.removeEventListener('click', switchFunction); need to add this

            currentProject.tasksArray.forEach((i, index) => {
                if (i.title === taskDiv.id) {
                    currentProject.tasksArray.splice(index, 1);
                    renderTasks(currentProject.tasksArray);
                    renderProjects(projectTitleList);
                }
            });
        });
        if (element.checked === false) {
            taskTitle.style.color = '#1d1d2c';
            taskTitle.style.textDecoration = 'none';
            taskCheckbox.checked = false;
        }
        else {
            taskTitle.style.color = 'grey';
            taskTitle.style.textDecoration = 'line-through';
            taskCheckbox.checked = true;
            taskBall.textContent = '⚪';
            taskViewNotesButton.style.color = 'grey';
            taskDeleteButton.style.color = 'grey';
            taskEditButton.style.color = 'grey';
            //taskCheckbox.style.textDecoration = 'line-through';
        };

        if (element.checked === true) {
            taskDiv.style.borderColor = 'grey';
        }
        else {
            if (element.priority === 'Low priority') {
                // taskDiv.style.borderColor = '#ffd900';
                taskDiv.style.borderColor = 'lightblue';
            }
            else if (element.priority === 'Medium priority') {
                taskDiv.style.borderColor = '#3e86b3';
                // taskDiv.style.borderColor = 'orange'
            }
            else {
                taskDiv.style.borderColor = '#1d1d2c';
                // taskDiv.style.borderColor = '#e40c2b'
            }


            if (element.select === true) {
                document.title = '🔴 ' + element.title.toString() + ' | Remembrall';
                // taskDiv.style.backgroundColor = '#e2465d';
                taskDiv.style.borderColor = '#e2465d';
            }
            addProjectsToStorage();
        };

    });
};






newTaskButton.addEventListener('click', createTask);
newProjectButton.addEventListener('click', createProject);


export { renderTasks, renderProjects, newProjectButton }