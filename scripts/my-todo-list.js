let todoListTitle = localStorage.getItem("todoListTitle") || null;
let todoList = [];

// Load to-do list from localStorage when the page loads
document.addEventListener("DOMContentLoaded", (event) => {
  loadTodoListTitle();
  loadTodoList();
  renderTodoList();
});

function dropDownTitleBox() {
  const html = `
    <input class="js-title-input title-input-box" placeholder=" Enter title" />
    <button class="js-save-title-button title-save-button" onclick="
      addTitle('.js-title-input');
      renderTodoInput();
      removeInputBox ('.js-add-title-container'); 
    ">
      <img class = "save-img" src = "icons/check_circle.png">
    </button>
  `;
  document.querySelector(".js-add-title-container").innerHTML = html;
}

function removeInputBox(box) {
  document.querySelector(`${box}`).innerHTML = ``;
}

function addTitle(from) {
  const inputElement = document.querySelector(`${from}`);
  const title = inputElement.value;

  if (!title) {
    alert("Add title, title makes your to-do list organizable.");
  }

  todoListTitle = title;
  renderTodoTitle(title);
  saveTitle();
}

function renderTodoTitle(title) {
  const html = `
    <div class = "edit-grid">
      <button class = "edit-title-button" onclick = "
        editTitleBox();
      ">
        <img class = "edit-title" src = "icons/edit_square_brown.png">
      </button>
      <div class = "edit-title-input-box">${title}</div>
    </div>
  `;

  document.querySelector(".todo-title").innerHTML = html;
}

function editTitleBox() {
  const html = `
    <input class="js-edit-title-input edit-title-input" placeholder="Enter title" />
    <button class="js-save-edited-title edit-save-button" onclick="
      addTitle('.js-edit-title-input');
      saveTitle ();
      removeInputBox('.js-edit-title-container');
    ">
      <img class = "edit-save-img" src = "icons/check_circle_brown.png">
    </button>
  `;
  document.querySelector(".js-edit-title-container").innerHTML = html;
}

function saveTitle() {
  const todoListTitleJson = JSON.stringify(todoListTitle);
  localStorage.setItem("todoListTitle", todoListTitleJson);
}

// Load to-do list title from localStorage
function loadTodoListTitle() {
  const todoListTitleJson = localStorage.getItem("todoListTitle");
  if (todoListTitleJson) {
    todoListTitle = JSON.parse(todoListTitleJson);
  } else {
    todoListTitle = ``;
  }
}

function renderTodoInput() {
  const html = `
    <div class="todo-input-grid">
      <input
        class="js-name-input name-input"
        placeholder="Enter your todos"
        onkeydown="handleOnkeydown(event);"
      />
      <input class="js-due-date-input due-date-input" type="date" />
      <button class="add-todo-button js-add-todo-button">
        <img class="add-icon" src="icons/add-light-brown.png" />
      </button>
    </div>
  `;
  document.querySelector(".js-created-todo").innerHTML = html;

  document.querySelector('.js-add-todo-button')
    .addEventListener('click', () => {
      addTodo();
    });
}

function handleOnkeydown(event) {
  if (event.key === "Enter") {
    addTodo();
  }
}

function renderTodoList() {
  let todoListHtml = ``;
  renderTodoTitle(todoListTitle);
  renderTodoInput();

  todoList.forEach((todoObject, index) => {
    const doneClass = todoObject.done ? "done-clicked" : "";
    const html = `
        <div id = "js-input-text-${index}" class = "${doneClass}" >&bull; ${todoObject.name} 
        </div>
        <div id = "js-date-text-${index}" class = "${doneClass}">due: ${todoObject.dueDate} 
        </div>
        <button onclick = "
          addClassToText(${index});
          " class = "done-todo-button">
          <img class = "done-icon" src="icons/check-green.png">
        </button>
        <button class = "delete-todo-button js-delete-todo-button">
          <img class = "delete-icon" src="icons/delete-brown.png">
        </button>
    `;
    todoListHtml += html;
  });
  
  document.querySelector(".js-todo-list").innerHTML = todoListHtml;
  saveTodoList();

  document.querySelectorAll('.js-delete-todo-button')
    .forEach( (deleteButton , index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();  
      });
    });
}

function addClassToText(index) {
  todoList[index].done = !todoList[index].done;
  renderTodoList();
}

// Save to-do list to localStorage
function saveTodoList() {
  const todoListJson = JSON.stringify(todoList);
  localStorage.setItem("todoList", todoListJson);
}

// Load to-do list from localStorage
function loadTodoList() {
  const todoListJson = localStorage.getItem("todoList");
  if (todoListJson) {
    todoList = JSON.parse(todoListJson);
  } else {
    todoList = [];
  }
}

function addTodo() {
  const nameInputElement = document.querySelector(".js-name-input");
  const name = nameInputElement.value;

  const dateInputElement = document.querySelector(".js-due-date-input");
  const dueDate = dateInputElement.value;

  // Check if name is empty
  if (name.trim() !== "") {
    const todo = {
      name: name,
      dueDate: dueDate,
      done: false,
    };
    todoList.push(todo);
    console.log(todoList);

    // Clear the input fields after adding the todo
    nameInputElement.value = "";
    dateInputElement.value = "";

    renderTodoList();
  } else {
    alert("Please enter a name for the todo.");
  }
}