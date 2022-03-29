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
const Library = [];

function Factory() {
  const projects = [];
  const add = (todo) => {
    projects.push(todo);
    Library.push(todo);
  };
  const removeTd = (projectIndex, libraryIndex) => {
    projects.splice(projectIndex, 1)
    Library.splice(libraryIndex, 1)
  };
  const getTodo = (index) => {
    return index === undefined ? projects : projects[index];
  };
  return {
    add,
    removeTd,
    getTodo,
  };
}

export { Todo, Projects, Factory, Library };
