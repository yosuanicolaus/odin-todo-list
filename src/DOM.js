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

function createTextInput(placeholder, id) {
  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = id;
  textInput.placeholder = placeholder;
  return textInput;
}

function createButton(textContent, id) {
  const button = document.createElement("button");
  button.type = "button";
  button.id = id;
  button.textContent = textContent;
  return button;
}

function createSelect(options, id) {
  const select = document.createElement("select");
  select.id = id;
  for (let i = 0; i < options.length; i++) {
    const option = document.createElement("option");
    option.textContent = options[i];
    select.append(option);
  }
  return select;
}

function createGroup(items, id, element = "div") {
  const group = document.createElement(element);
  group.id = id;
  for (let i = 0; i < items.length; i++) {
    group.append(items[i]);
  }
  return group;
}

function createProjectForm() {
  const input = createTextInput("Really Cool Project");
  const submit = createButton("add project");
  submit.onclick = () => {
    addProject(input.value);
    renderTab();
    projectFormExist = false;
  };
  const cancel = createButton("cancel");
  cancel.onclick = () => {
    projectTab.removeChild(form);
    projectFormExist = false;
  };

  const buttons = createGroup([submit, cancel]);
  const form = createGroup([input, buttons], "projectform", "form");
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
  const title = createTextInput("E.g. Walk my dog at 5pm");
  const description = createTextInput("Description...");
  const date = document.createElement("input");
  date.setAttribute("type", "date");
  date.valueAsDate = new Date();

  const project = createSelect(Object.keys(Projects));
  const priority = createSelect(["p1", "p2", "p3", "p4"]);

  // const formSubmit = document.createElement("button");
  // formSubmit.id = "formSubmit";
  // formSubmit.setAttribute("type", "button");
  // formSubmit.textContent = "Add task";
  const formSubmit = createButton("Add task", "formSubmit");
  formSubmit.onclick = () => {
    submitForm(
      title.value,
      description.value,
      date.value,
      project.value,
      priority.value
    );
    formExist = false;
  };

  // const formCancel = document.createElement("button");
  // formCancel.setAttribute("type", "button");
  // formCancel.textContent = "Cancel";
  const formCancel = createButton("Cancel");
  formCancel.onclick = () => {
    content.removeChild(form);
    formExist = false;
  };

  // const formFlex = document.createElement("div");
  // formFlex.id = "formFlex";
  // formFlex.append(date, project, priority);
  const formFlex = createGroup([date, project, priority], "formFlex");
  const buttons = createGroup([formSubmit, formCancel]);
  const form = createGroup(
    [title, description, formFlex, buttons],
    undefined,
    "form"
  );
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
