import { addTodo, addProject } from ".";
import { Library, Projects } from "./todo";
import {
  createItem,
  createButton,
  createDateInput,
  createGroup,
  createSelect,
  createText,
  createTextInput,
} from "./create";

const addButton = document.getElementById("add");
const user = document.getElementById("user");
const tab = document.getElementsByClassName("tab");
const newproject = document.getElementById("newproject");
const projectTab = document.getElementById("projects");
const content = document.getElementById("content");

let lastProject = "inbox";

function createProjectForm() {
  const input = createTextInput("Really Cool Project");
  const submit = createButton("add project");
  submit.onclick = () => {
    addProject(input.value);
    renderTab();
  };
  const cancel = createButton("cancel");
  cancel.onclick = () => {
    projectTab.removeChild(form);
  };

  const buttons = createGroup([submit, cancel]);
  const form = createGroup([input, buttons], "projectform", "form");
  return form;
}

function renderTab() {
  projectTab.innerHTML = "";
  for (const key in Projects) {
    const tab = createText(key);
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
  };
  const formCancel = createButton("Cancel");
  formCancel.onclick = () => content.removeChild(form);

  const formFlex = createGroup([date, project, priority], "formFlex");
  const buttons = createGroup([formSubmit, formCancel]);
  const form = createGroup(
    [title, description, formFlex, buttons],
    "todoform",
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

function todoFormExist() {
  const form = document.getElementById("todoform");
  return form !== null;
}

function projectFormExist() {
  const form = document.getElementById("projectform");
  return form !== null;
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
  render();
}

function render(dataProject = lastProject) {
  content.innerHTML = "";
  const project = dataProject;
  Projects[project].getTodo().forEach((todo) => {
    const title = todo.getInfo().title;
    const description = todo.getInfo().description;
    const dueDate = todo.getInfo().dueDate;
    const priority = todo.getInfo().priority;

    content.appendChild(
      createTodo(title, description, dueDate, project, priority)
    );
  });
}

function renderByDate() {}

addButton.onclick = () => {
  if (todoFormExist()) return;
  addForm();
};

newproject.onclick = () => {
  if (projectFormExist()) return;
  addProjectForm();
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

//key listener for testing
document.addEventListener("keydown", () => {
  console.log(Library);
});
