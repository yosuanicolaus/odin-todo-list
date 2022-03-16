import "sanitize.css";
import "./style.css";

function Todo(title, description, dueDate, priority) {
  const getInfo = () => {
    return { title, description, dueDate, priority };
  };
  const setInfo = (newTitle, newDescription, newDueDate, newPriority) => {
    title = newTitle;
    description = newDescription;
    dueDate = newDueDate;
    priority = newPriority;
  };
  return {
    getInfo,
    setInfo,
  };
}

const Projects = { inbox: Factory() };

function Factory() {
  const projects = [];
  const add = (todo) => {
    projects.push(todo);
  };
  const getTodo = (index) => {
    return projects[index];
  };
  return {
    add,
    getTodo,
  };
}

Projects["inbox"].add(Todo("walk momo"));
console.log(Projects["inbox"].getTodo(0).getInfo());

Projects["inbox"].add(Todo("walk buddy"));
console.log(Projects["inbox"].getTodo(1).getInfo());

// create new project
Object.assign(Projects, { newProject: Factory() });
Projects["newProject"].add(Todo("go to moon"));
console.log(Projects["newProject"].getTodo(0).getInfo());
console.log(Projects["newProject"].getTodo(1)?.getInfo());
