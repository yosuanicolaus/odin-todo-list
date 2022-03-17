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

export { Todo, Projects, Factory };
