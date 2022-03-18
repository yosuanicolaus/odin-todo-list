/* 
    <header>
      <h1>ToDo</h1>
      <button id="add">Add Todo</button>
      <span id="user">John Doe</span>
    </header>
    <nav>
      <div class="tab">Inbox</div>
      <div class="tab">Today</div>
      <div class="tab">This Week</div>
      <div class="tab">Labels</div>
      <div id="projects">Projects</div>
    </nav>
    <main>
      <head>
        <strong>Today</strong>
        <span>Wed 16 Mar</span>
      </head>
      <div id="content"></div>
    </main>
*/
import { connect } from ".";
import { Projects } from "./todo";

const addButton = document.getElementById("add");
const user = document.getElementById("user");
const tab = document.getElementsByClassName("tab");
const projectTab = document.getElementById("projects");
const content = document.getElementById("content");

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
    deleteForm(form);
  };

  const formCancel = document.createElement("button");
  formCancel.setAttribute("type", "button");
  formCancel.textContent = "Cancel";
  formCancel.onclick = () => deleteForm(form);

  formFlex.append(formDate, formProject, formPriority);
  formButtons.append(formSubmit, formCancel);
  form.append(formTitle, formDescription, formFlex, formButtons);

  return form;
}

function createTodo(title, description = "", dueDate, project, priority) {
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

function submitForm(title, description, date, project, priority) {
  // content.appendChild(createTodo(title, description, date, project, priority));
  // send data to index.js through formData
  Object.assign(formData, { title, description, date, project, priority });
  connect();
}

function deleteForm(form) {
  content.removeChild(form);
}

export function render(dataProject) {
  content.innerHTML = ""; // effective clean, but there's some error
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

addButton.onclick = () => addForm();

export const formData = {};

//sample todo
submitForm(
  "Walk my dog at 5pm",
  `Dogs are truly man's best friend. We live in a socitey...`,
  "2022-03-18",
  "inbox",
  "p1"
);
