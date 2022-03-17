import "sanitize.css";
import "./style.css";
import { Todo, Projects, Factory } from "./todo";
import { formData, render } from "./DOM";

export function connect() {
  addTodo();
  render(formData.project);
}

function addTodo() {
  if (Projects[formData.project] === undefined)
    Projects[formData.project] = Factory();

  Projects[formData.project].add(
    Todo(formData.title, formData.description, formData.date, formData.priority)
  );
}

/* 
Projects["inbox"].add(Todo("walk momo"));
console.log(Projects["inbox"].getTodo(0).getInfo());

Projects["inbox"].add(Todo("walk buddy"));
console.log(Projects["inbox"].getTodo(1).getInfo());

// create new project
Object.assign(Projects, { newProject: Factory() });
Projects["newProject"].add(Todo("go to moon"));
console.log(Projects["newProject"].getTodo(0).getInfo());
console.log(Projects["newProject"].getTodo(1)?.getInfo());
 */
