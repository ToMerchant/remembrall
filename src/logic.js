//title, description, duedate, priority
import { renderTasks, renderProjects, newProjectButton } from './dom.js';



let projectTitleList = [];

let projectsArray = [];

let currentProject = '';

class Task {
    constructor(title, notes, checked, priority, date) {
        this.title = title;
        this.notes = notes;
        this.checked = checked;
        this.priority = priority;
        this.date = date;
    }
};

class Project {
    constructor(title, id) {
        this.title = title;
        this.tasksArray = [];
        this.id = id;
    }
    newTask(title, notes, checked, priority, date) {
        let newTask = new Task(title, notes, checked, priority, date)
        this.tasksArray.push(newTask)
    }
};

let initialProject = (() => {
    let defaultProject = new Project('General', 'General');
    projectsArray.push(defaultProject);
    projectTitleList.push(defaultProject.title)
    currentProject = defaultProject;
    renderProjects(projectTitleList);
})();




let submitProjectForm = () => {
    let x = new Project(titleInput.value.toString(), titleInput.value.toString());
    projectsArray.push(x);
    projectTitleList.push(x.title)
    currentProject = x;
    renderProjects(projectTitleList);
    newProjectForm.remove();
    renderTasks(currentProject.tasksArray);
};

let submitTaskForm = () => {
    if (titleInput.value.length < 1) {
        alert('You must enter a Title.');
        //return false;

        renderTasks(currentProject.tasksArray);
        newTaskForm.remove();

    }
    else {
        if (projectsArray.length < 1) {
            alert('You must create a new project before you submit a new task.');
            renderTasks(currentProject.tasksArray);
            newTaskForm.remove();
        }
        else {
            currentProject.newTask((titleInput.value.toString()), (notesArea.value), false, (setPriority.value), setDate.value);
            //currentProject.new
            renderTasks(currentProject.tasksArray);
            newTaskForm.remove();
        }
    }

};




let switchProject = (divId) => {

    projectsArray.forEach(element => {
        if (divId === element.id) {
            renderTasks(element.tasksArray)
            currentProject = element;

        }
    })
};




export { Task, Project, submitTaskForm, submitProjectForm, currentProject, switchProject, projectsArray, projectTitleList }


