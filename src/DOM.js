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
  const formDate = document.createElement("input");
  formDate.setAttribute("type", "date");
  const formProject = document.createElement("select");
  const formPriority = document.createElement("select");

  const formSubmit = document.createElement("button");
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
  form.append(formTitle, formDescription, formFlex, formSubmit, formCancel);

  return form;
}

function createTodo(title, description = "", dueDate, project, priority) {
  const Todo = document.createElement("div");

  const check = document.createElement("input");
  check.setAttribute("type", "radio");

  const taskTitle = document.createElement("div");
  taskTitle.textContent = title;
  const taskDescription = document.createElement("div");
  taskDescription.textContent = description;
  const taskDate = document.createElement("div");
  taskDate.textContent = dueDate;
  const taskProject = document.createElement("div");
  taskProject.textContent = project;
  const taskPriority = document.createElement("div");
  taskPriority.textContent = priority;

  Todo.append(
    check,
    taskTitle,
    taskDescription,
    taskDate,
    taskProject,
    taskPriority
  );

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

addButton.onclick = () => addForm();

export const formData = {};