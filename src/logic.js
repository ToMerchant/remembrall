//title, description, duedate, priority
import { renderTasks, renderProjects } from './dom.js';



let projectTitleList = [];

let projectsArray = [];

let currentProject = '';

class Task {
    constructor(title) {
        this.title = title;
    }
};

class Project {
    constructor(title, id){
        this.title = title;
        this.tasksArray = [];
        this.id = id;
    }
    newTask(title){
        let newTask = new Task(title)
        this.tasksArray.push(newTask.title)
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
    currentProject.newTask(titleInput.value.toString());
    renderTasks(currentProject.tasksArray);
    newTaskForm.remove();
};




let switchProject = (divId) => {

    projectsArray.forEach(element => {
        if(divId===element.id){
            renderTasks(element.tasksArray)
            currentProject = element;
            
        }
    })
};

  
 

export { Task, Project, submitTaskForm, submitProjectForm, currentProject, switchProject, projectsArray, projectTitleList} 


