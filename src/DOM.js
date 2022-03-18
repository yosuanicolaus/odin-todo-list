import { addTodo, addProject } from ".";
import { Projects } from "./todo";

const addButton = document.getElementById("add");
const user = document.getElementById("user");
const tab = document.getElementsByClassName("tab");
const newproject = document.getElementById("newproject");
const projectTab = document.getElementById("projects");
const content = document.getElementById("content");

let formExist = false;
let projectFormExist = false;

function createProjectForm() {
  const form = document.createElement("form");
  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.placeholder = "Really Cool Project";
  const submit = document.createElement("button");
  submit.textContent = "add project";
  submit.type = "button";
  submit.onclick = () => {
    // addNewProject(input.value);
    addProject(input.value);
    renderTab();
    projectFormExist = false;
  };
  const cancel = document.createElement("button");
  cancel.textContent = "cancel";
  cancel.type = "button";
  cancel.onclick = () => {
    projectTab.removeChild(form);
    projectFormExist = false;
  };

  const buttons = document.createElement("div");
  buttons.append(submit, cancel);

  form.append(input, buttons);
  form.style.width = "160px";
  return form;
}

function renderTab() {
  projectTab.innerHTML = "";
  for (const key in Projects) {
    const tab = document.createElement("div");
    tab.textContent = key;
    projectTab.appendChild(tab);
  }
}

function createForm() {
  const form = document.createElement("form");
  const formTitle = document.createElement("input");
  formTitle.setAttribute("type", "text");
  formTitle.placeholder = "E.g. Walk my dog at 5pm";

  const formDescription = document.createElement("input");
  formDescription.setAttribute("type", "text");
  formDescription.placeholder = "Description...";

  const formFlex = document.createElement("div");
  formFlex.id = "formFlex";
  const formDate = document.createElement("input");
  formDate.setAttribute("type", "date");
  formDate.valueAsDate = new Date();

  const formProject = document.createElement("select");
  for (const key in Projects) {
    const optionProject = document.createElement("option");
    optionProject.textContent = key;
    formProject.append(optionProject);
  }

  const formPriority = document.createElement("select");
  for (let i = 1; i <= 4; i++) {
    const optionPriority = document.createElement("option");
    optionPriority.textContent = "p" + i;
    formPriority.append(optionPriority);
  }

  const formButtons = document.createElement("div");
  const formSubmit = document.createElement("button");
  formSubmit.id = "formSubmit";
  formSubmit.setAttribute("type", "button");
  formSubmit.textContent = "Add task";
  formSubmit.onclick = () => {
    submitForm(
      formTitle.value,
      formDescription.value,
      formDate.value,
      formProject.value,
      formPriority.value
    );
    formExist = false;
  };

  const formCancel = document.createElement("button");
  formCancel.setAttribute("type", "button");
  formCancel.textContent = "Cancel";
  formCancel.onclick = () => {
    content.removeChild(form);
    formExist = false;
  };

  formFlex.append(formDate, formProject, formPriority);
  formButtons.append(formSubmit, formCancel);
  form.append(formTitle, formDescription, formFlex, formButtons);

  return form;
}

function createTodo(title, description, dueDate, project, priority) {
  const Todo = document.createElement("div");
  Todo.id = "todo";

  const check = document.createElement("input");
  check.setAttribute("type", "radio");

  const taskTitle = document.createElement("div");
  taskTitle.textContent = title;
  const taskDescription = document.createElement("div");
  taskDescription.textContent = description;

  const todoFlex = document.createElement("div");
  todoFlex.id = "todoFlex";
  const taskDate = document.createElement("div");
  taskDate.textContent = dueDate;
  const taskProject = document.createElement("div");
  taskProject.textContent = project;
  const taskPriority = document.createElement("div");
  taskPriority.textContent = priority;

  todoFlex.append(taskDate, taskProject, taskPriority);
  Todo.append(check, taskTitle, taskDescription, todoFlex);

  return Todo;
}

function addForm() {
  content.appendChild(createForm());
}

function addProjectForm() {
  projectTab.appendChild(createProjectForm());
}

function submitForm(title, description, date, project, priority) {
  // content.appendChild(createTodo(title, description, date, project, priority));
  // send data to index.js through formData
  Object.assign(formData, { title, description, date, project, priority });
  // connect();
  addTodo();
  render(formData.project);
}

export function render(dataProject) {
  content.innerHTML = "";
  const project = dataProject;
  Projects[project].getTodo().forEach((todo) => {
    console.log(todo);
    const title = todo.getInfo().title;
    const description = todo.getInfo().description;
    const dueDate = todo.getInfo().dueDate;
    const priority = todo.getInfo().priority;

    content.appendChild(
      createTodo(title, description, dueDate, project, priority)
    );
  });
}

addButton.onclick = () => {
  if (formExist) return;
  addForm();
  formExist = true;
};

newproject.onclick = () => {
  if (projectFormExist) return;
  addProjectForm();
  projectFormExist = true;
};

export const formData = {};

renderTab();

//sample todo
submitForm(
  "Walk my dog at 5pm",
  `Dogs are truly man's best friend. We live in a socitey...`,
  "2022-03-18",
  "inbox",
  "p1"
);
