import { newProjectButton } from './dom.js';
import { Task, Project, submitTaskForm, submitProjectForm, addProjectsToStorage, currentProject, switchProject, projectsArray, projectTitleList } from './logic.js';
import { renderProjects, createProject } from './projects.js';
import { format, fromUnixTime, } from 'date-fns';

let cancelCreateTask = function (newProjectButton, newTaskButton) {
    newProjectButton.style.display = 'inline';
    newTaskButton.style.display = 'inline';
    renderTasks(currentProject.tasksArray);
    newTaskForm.remove();
}


let runCreateTask = function () {
    let newTaskForm = document.createElement('form');
    newTaskForm.setAttribute("id", "newTaskForm");
    newTaskForm.style.backgroundColor = '#eee';
    newTaskContainer.appendChild(newTaskForm);
    newTaskForm.style.radius = '15px';

    let titleInput = document.createElement('input');
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("id", "titleInput");
    titleInput.style.margin = '2px';
    titleInput.placeholder = 'Title';
    newTaskForm.appendChild(titleInput);

    let setPriority = document.createElement('select');
    setPriority.setAttribute("id", "setPriority");
    setPriority.style.margin = '2px';
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
    setDate.style.margin = '2px';
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
        cancelCreateTask(newProjectButton, newTaskButton);
    })

    let lineBreak = document.createElement('br');
    newTaskForm.appendChild(lineBreak);

    let notesArea = document.createElement('textarea');
    notesArea.setAttribute("type", "text");
    notesArea.setAttribute('id', 'notesArea');
    notesArea.rows = 6;
    notesArea.cols = 60;
    notesArea.setAttribute("id", "notesArea");
    notesArea.placeholder = 'Notes...';
    newTaskForm.appendChild(notesArea);

    newProjectButton.style.display = 'none';
    newTaskButton.style.display = 'none';

    formSubmitButton.addEventListener('click', submitTaskForm);

}

let createTask = () => {
    if (projectsArray.length < 1) {
        alert('You must create a new project before you submit a new task.');
    }
    else {
        runCreateTask()
    }
};

let renderTaskHeader = function () {
    if (projectContainer.style.display === 'none') {
        let taskHeader = document.createElement('div');
        taskHeader.textContent = currentProject.title;
        taskHeader.setAttribute('id', 'taskHeader');
        taskListContainer.appendChild(taskHeader);
    };
}

function checkFalse(val) {
    return val === false;
}

let setIcon = function () {
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
}

let setTaskBall = function (taskBall, element) {
    if (element.select === true) {
        taskBall.textContent = '🔴';
        // taskBall.backgroundColor = '#eee';
        // document.title = '⚪ Remembrall';
    }
    else {
        taskBall.textContent = '⭕';
        //document.title = '🔴 Remembrall';
    }
}

function selectTask(element) {
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
}


let changeChecked = function (element) {
    element.checked ? (element.checked = false) : (element.checked = true);
    renderTasks(currentProject.tasksArray);
}



let notesAreaDisplay = function (notesAreaView) {
    if (notesAreaView.style.display === 'none') {
        notesAreaView.style.display = 'flex';
    }
    else {
        notesAreaView.style.display = 'none';
    }
}

let updateTasks = function (newProjectButton, newTaskButton, element, taskCheckbox, taskViewNotesButton, taskEditButton, taskDeleteButton, taskEditTitle, setPriority, taskDateEdit) {
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
};

let cancelTask = function (newProjectButton, newTaskButton, taskCheckbox, taskViewNotesButton, taskEditButton, taskDeleteButton) {
    newProjectButton.style.display = 'inline';
    newTaskButton.style.display = 'inline';
    renderTasks(currentProject.tasksArray);

    taskCheckbox.style.display = 'inline';
    taskViewNotesButton.style.display = 'inline';
    taskEditButton.style.display = 'inline';
    taskDeleteButton.style.display = 'inline';
}

let editTask = function (element, newProjectButton, newTaskButton, taskDiv, taskCheckbox, taskViewNotesButton, taskEditButton, taskDeleteButton, taskTitle, taskDate) {

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
        updateTasks(newProjectButton, newTaskButton, element, taskCheckbox, taskViewNotesButton, taskEditButton, taskDeleteButton, taskEditTitle, setPriority, taskDateEdit);
    });

    cancelTaskButton.addEventListener('click', function () {
        cancelTask(newProjectButton, newTaskButton, taskCheckbox, taskViewNotesButton, taskEditButton, taskDeleteButton);
    });

    addProjectsToStorage();

};

let createDate = function (element, taskDate) {
    if (element.date.length > 0) {
        taskDate.setAttribute('id', 'taskDate');
        let taskDateObject = new Date(element.date);
        let taskDateWeekday = format(taskDateObject, 'EEE')
        let taskDateMonth = format(taskDateObject, 'MMMM');
        let taskDateDay = format(taskDateObject, 'do');
        taskDate.textContent = `${taskDateWeekday} ${taskDateDay} ${taskDateMonth} `;
    }
    else { taskDate.textContent = '' };

}

let deleteTask = function (taskDiv) {
    currentProject.tasksArray.forEach((i, index) => {
        if (i.title === taskDiv.id) {
            currentProject.tasksArray.splice(index, 1);
            renderTasks(currentProject.tasksArray);
            renderProjects(projectTitleList);
        }
    })
}

let styleDivItems = function (element, taskTitle, taskCheckbox, taskViewNotesButton, taskBall, taskEditButton, taskDeleteButton) {
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
        //taskButton.style.color = 'grey';
        taskEditButton.style.color = 'grey';
        //taskCheckbox.style.textDecoration = 'line-through';
    }
}

let styleDivBorder = function (element, taskDiv) {
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

        addProjectsToStorage();
    }
}

let updatePageTitle = function (element, taskDiv) {
    if (element.select === true && element.checked === false) {
        if (element.select === true) {
            document.title = '🔴 ' + element.title.toString() + ' | Remembrall';
            // taskDiv.style.backgroundColor = '#e2465d';
            taskDiv.style.borderColor = '#e2465d';
        }
        addProjectsToStorage();
    }
}

let renderEachTask = function (arr) {
    arr.forEach(element => {

        let taskDiv = document.createElement('div');
        taskDiv.setAttribute('class', 'taskDiv');
        taskDiv.setAttribute('id', element.title);
        //taskListContainer.appendChild(taskDiv);
        taskListContainer.appendChild(taskDiv);

        let taskBall = document.createElement('button');
        taskBall.setAttribute('class', 'taskBall');

        setTaskBall(taskBall, element);

        taskDiv.appendChild(taskBall);
        taskBall.addEventListener('click', function () {
            selectTask(element);
        })

        let taskCheckbox = document.createElement('input');
        taskCheckbox.setAttribute("type", "checkbox");
        taskCheckbox.setAttribute('id', 'taskCheckbox');

        taskCheckbox.addEventListener('click', function () {
            changeChecked(element);
        });

        let taskTitle = document.createElement('p');
        taskTitle.setAttribute('id', 'taskTitle')
        taskTitle.textContent = element.title;
        taskDiv.appendChild(taskTitle);

        let taskDate = document.createElement('div');
        createDate(element, taskDate);

        taskDiv.appendChild(taskDate);

        let taskViewNotesButton = document.createElement('button');
        taskViewNotesButton.setAttribute('class', 'taskViewNotesButton');
        taskViewNotesButton.innerHTML = '<i class="fas fa-clipboard"></i>';
        taskDiv.appendChild(taskViewNotesButton);

        let notesAreaView = document.createElement('textarea');
        notesAreaView.setAttribute("type", "text");
        notesAreaView.setAttribute('id', 'notesAreaView');
        notesAreaView.rows = 6;
        notesAreaView.cols = 60;
        notesAreaView.value = element.notes;
        notesAreaView.style.display = 'none';

        taskViewNotesButton.addEventListener('click', function () {
            notesAreaDisplay(notesAreaView);
        })

        let taskEditButton = document.createElement('button')
        taskEditButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
        taskEditButton.className = 'taskEditButton'
        taskDiv.appendChild(taskEditButton);

        taskEditButton.addEventListener('click', function () {
            editTask(element, newProjectButton, newTaskButton, taskDiv, taskCheckbox, taskViewNotesButton, taskEditButton, taskDeleteButton, taskTitle, taskDate);

        })

        let taskDeleteButton = document.createElement('button')
        taskDeleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        taskDeleteButton.className = 'taskDeleteButton'
        taskDiv.appendChild(taskDeleteButton);
        taskDiv.appendChild(taskCheckbox);
        taskDiv.appendChild(taskBall);
        taskDiv.appendChild(notesAreaView);

        taskDeleteButton.addEventListener('click', function () {
            deleteTask(taskDiv);
        });

        styleDivItems(element, taskTitle, taskCheckbox, taskViewNotesButton, taskBall, taskEditButton, taskDeleteButton);

        styleDivBorder(element, taskDiv);

        updatePageTitle(element, taskDiv);
    });
}

let renderTasks = (arr) => {
    taskListContainer.innerHTML = '';
    renderTaskHeader();
    setIcon();
    renderEachTask(arr);
};

export { renderTasks, createTask }