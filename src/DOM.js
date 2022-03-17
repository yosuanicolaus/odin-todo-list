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

const addButton = document.getElementById("add");
const user = document.getElementById("user");
const tab = document.getElementsByClassName("tab");
const projectTab = document.getElementById("projects");
const content = document.getElementById("content");

function createForm() {
  const form = document.createElement("form");
  const formTitle = document.createElement("input");
  formTitle.setAttribute("type", "text");
  formTitle.placeholder = "Walk my dog at 5pm";

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
    console.log("submitting data, deleting form");
  };

  formFlex.append(formDate, formProject, formPriority);
  form.append(formTitle, formDescription, formFlex, formSubmit);

  return form;
}

function addForm(todo) {
  console.log("adding content");
  content.appendChild(createForm());
}

export { addButton, addForm };
