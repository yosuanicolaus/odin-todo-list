import "sanitize.css";
import "./style.css";
import { Todo, Projects, Factory } from "./todo";
import { formData } from "./DOM";

export function connect() {
  console.log("connecting,,,");
  console.log({ ...formData });
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
