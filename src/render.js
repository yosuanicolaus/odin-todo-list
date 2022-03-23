import { Projects, Library } from "./todo";
import { createTodo, content } from "./DOM";

const head = document.getElementById("head");

export function render(renderBy = "all", key) {
  content.innerHTML = "";
  switch (renderBy) {
    case "project":
      renderByProject(key);
      break;
    case "date":
      renderByDate(key);
      break;
    case "all":
      renderAll();
  }
}

function renderByProject(project = "inbox") {
  Projects[project].getTodo().forEach((todo) => {
    renderItem(todo, project);
  });
  head.textContent = project;
}

function renderByDate(type = "today") {
  switch (type) {
    case "today":
      renderToday();
      break;
    case "week":
      renderWeek();
  }
}

function renderAll() {
  for (const key in Projects) {
    renderByProject(key);
  }
  head.textContent = "All";
}

function renderItem(todo, project) {
  const title = todo.getInfo().title;
  const description = todo.getInfo().description;
  const dueDate = todo.getInfo().dueDate;
  const priority = todo.getInfo().priority;

  content.appendChild(
    createTodo(title, description, dueDate, project, priority)
  );
}

function renderToday() {
  let date = new Date();
  head.textContent = "Today, " + date.toLocaleString().slice(0, 10);
  date = date.toISOString().split("T")[0];

  renderDay(date);
}

function renderWeek() {
  head.textContent = "This Week";
  const Dates = Array(7);
  for (let i = 0; i < Dates.length; i++) {
    Dates[i] = new Date();
    Dates[i].setDate(Dates[i].getDate() + i);
    Dates[i] = Dates[i].toISOString().split("T")[0];
  }

  Dates.forEach((date) => {
    renderDay(date);
  });
}

function renderDay(date) {
  Library.forEach((todo) => {
    if (todo.getInfo().dueDate == date) {
      renderItem(todo);
    }
  });
}
