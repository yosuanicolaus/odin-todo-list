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

function createItem(element, id, type = element) {
  const item = document.createElement(element);
  item.type = type;
  item.id = id;
  return item;
}

function createTextInput(placeholder, id) {
  const textInput = createItem("input", id, "text");
  textInput.placeholder = placeholder;
  return textInput;
}

function createDateInput(date, id) {
  const dateInput = createItem("input", id, "date");
  dateInput.valueAsDate = date;
  return dateInput;
}

function createButton(textContent, id) {
  const button = createItem("button", id);
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

function createText(textContent, id) {
  const text = document.createElement("div");
  text.id = id;
  text.textContent = textContent;
  return text;
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
  const date = createDateInput(new Date());
  const project = createSelect(Object.keys(Projects));
  const priority = createSelect(["p1", "p2", "p3", "p4"]);

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
  const formCancel = createButton("Cancel");
  formCancel.onclick = () => {
    content.removeChild(form);
    formExist = false;
  };

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
  const check = createItem("input", "", "radio");
  const taskTitle = createText(title);
  const taskDescription = createText(description);
  const taskDate = createText(dueDate);
  const taskProject = createText(project);
  const taskPriority = createText(priority);

  const todoFlex = createGroup(
    [taskDate, taskProject, taskPriority],
    "todoFlex"
  );
  const Todo = createGroup(
    [check, taskTitle, taskDescription, todoFlex],
    "todo"
  );
  return Todo;
}

function addForm() {
  content.appendChild(createForm());
}

function addProjectForm() {
  projectTab.appendChild(createProjectForm());
}

function submitForm(title, description, date, project, priority) {
  // send data to index.js through formData
  Object.assign(formData, { title, description, date, project, priority });
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
