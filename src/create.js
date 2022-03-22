export function createItem(element, id, type = element) {
  const item = document.createElement(element);
  item.type = type;
  item.id = id;
  return item;
}

export function createTextInput(placeholder, id) {
  const textInput = createItem("input", id, "text");
  textInput.placeholder = placeholder;
  return textInput;
}

export function createDateInput(date, id) {
  const dateInput = createItem("input", id, "date");
  dateInput.valueAsDate = date;
  return dateInput;
}

export function createButton(textContent, id) {
  const button = createItem("button", id);
  button.textContent = textContent;
  return button;
}

export function createSelect(options, id) {
  const select = document.createElement("select");
  select.id = id;
  for (let i = 0; i < options.length; i++) {
    const option = document.createElement("option");
    option.textContent = options[i];
    select.append(option);
  }
  return select;
}

export function createText(textContent, id) {
  const text = document.createElement("div");
  text.id = id;
  text.textContent = textContent;
  return text;
}

export function createGroup(items, id, element = "div") {
  const group = document.createElement(element);
  group.id = id;
  for (let i = 0; i < items.length; i++) {
    group.append(items[i]);
  }
  return group;
}
