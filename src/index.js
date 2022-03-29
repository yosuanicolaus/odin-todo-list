import "sanitize.css";
import "./style.css";
import { Todo, Projects, Factory, Library } from "./todo";
import { formData } from "./DOM";

export function addTodo() {
  Projects[formData.project].add(
    Todo(formData.title, formData.description, formData.date, formData.priority)
  );
}

export function addProject(projectName) {
  Projects[projectName] = Factory();
}

export function removeTodo(title, desc, dueDate, priority, projectName) {
  let projectIndex = -1
  let libraryIndex = -1

  Projects[projectName].getTodo().forEach((todo, idx) => {
    console.log(todo.getInfo());
    const obj = todo.getInfo();
    if (
      (obj.title == title) &&
      (obj.description == desc) &&
      (obj.dueDate == dueDate) &&
      (obj.priority == priority)
    ) {
      console.log("FOUND IT HERE " + idx);
      projectIndex = idx
    }
  });

  Library.forEach((todo, idx) => {
    const obj = todo.getInfo();
    if (
      (obj.title == title) &&
      (obj.description == desc) &&
      (obj.dueDate == dueDate) &&
      (obj.priority == priority)
    ) {
      console.log("LIBER=RARRYY FOUND IT HERE " + idx);
      libraryIndex = idx
    }
  })

  Projects[projectName].removeTd(projectIndex, libraryIndex)
}
