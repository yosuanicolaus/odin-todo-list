import "sanitize.css";
import "./style.css";

function Todo(title, description = "-", dueDate = "-", priority = "-") {
  const getInfo = () => {
    return { title, description, dueDate, priority };
  };
  const setInfo = (newTitle, newDescription, newDueDate, newPriority) => {
    title = newTitle;
    description = newDescription;
    dueDate = newDueDate;
    priority = newPriority;
  };
  const edit = () => {
    return `editing ${title}`;
  };
  const checkStatus = () => {
    return `checking ${title}`;
  };
  return {
    getInfo,
    setInfo,
    edit,
    checkStatus,
  };
}

let x = new Todo("walsk dog");
console.log(x.getInfo());
console.log(x.checkStatus());

x.setInfo("go to mars", "just for fun lollz");
console.log(x.getInfo());
console.log(x.checkStatus());
