import "sanitize.css";
import "./style.css";
import { Todo, Projects, Factory } from "./todo";
import { formData } from "./DOM";

export function addTodo() {
  Projects[formData.project].add(
    Todo(formData.title, formData.description, formData.date, formData.priority)
  );
}

export function addProject(projectName) {
  Projects[projectName] = Factory();
}
