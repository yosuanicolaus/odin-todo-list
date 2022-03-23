import { addTodo, addProject } from ".";
import { Library, Projects } from "./todo";
import { render } from "./render";
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
const newproject = document.getElementById("newproject");
const projectTab = document.getElementById("projects");
const content = document.getElementById("content");

const tab1 = document.getElementById("tab1");
const tab2 = document.getElementById("tab2");
const tab3 = document.getElementById("tab3");
const tab4 = document.getElementById("tab4");

function createProjectForm() {
  const input = createTextInput("Really Cool Project");
  const submit = createButton("add project");
  submit.onclick = () => {
    addProject(input.value);
    renderTab();
  };
  const cancel = createButton("cancel");
  cancel.onclick = () => projectTab.removeChild(form);

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

function submitForm(title, description, date, project, priority) {
  // send data to index.js through formData
  Object.assign(formData, { title, description, date, project, priority });
  addTodo();
  render();
}

addButton.onclick = () => {
  if (todoFormExist()) return;
  content.appendChild(createForm());
};

newproject.onclick = () => {
  if (projectFormExist()) return;
  projectTab.appendChild(createProjectForm());
};

tab1.onclick = () => render("project", "inbox");
tab2.onclick = () => render("date", "today");
tab3.onclick = () => render("date", "week");
tab4.onclick = () => render("all");

renderTab();
export const formData = {};
export { createTodo, content };

/* --------------------------------------------------------------------------------------------------- */

//sample todo
submitForm(
  "Walk my dog at 5pm",
  `Dogs are truly man's best friend. We live in a socitey...`,
  "2022-03-23",
  "inbox",
  "p1"
);
submitForm("nice", "", "2022-03-23", "inbox", "p1");
submitForm("cool", "", "2022-03-24", "inbox", "p1");
submitForm("yeah", "", "2022-03-24", "inbox", "p1");
submitForm("bro", "", "2022-03-25", "inbox", "p1");
submitForm("bro", "", "2022-03-30", "inbox", "p1");
submitForm("bro", "", "2022-04-25", "inbox", "p1");
submitForm("bro", "", "2022-04-12", "inbox", "p1");
submitForm("bro", "", "2022-04-15", "inbox", "p1");

//key listener for testing
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "1":
      console.log("1 pressed, do ...");
      break;
    case "2":
      console.log("2 pressed, do ...");
      break;
  }
});
