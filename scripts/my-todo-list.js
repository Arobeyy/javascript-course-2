const todoList = [];

renderTodoList();

function renderTodoList() {
  let todoListHtml = ``;

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const html = `
        <div id = "js-input-text-${i}" >&bull; ${todoObject.name} 
        </div>
        <div id = "js-date-text-${i}">due: ${todoObject.dueDate} 
        </div>
        <button onclick = "
          addClassToText(${i});
          " class = "done-todo-button">
          <img class = "done-icon" src="icons/check-green.png">
        </button>
        <button onclick = "
          todoList.splice(${i}, 1);
          renderTodoList();  
        " class = "delete-todo-button">
          <img class = "delete-icon" src="icons/delete-brown.png">
        </button>
    `;
    todoListHtml += html;
  }
  document.querySelector(".js-todo-list").innerHTML = todoListHtml;
}

function addClassToText(index) {
  const inputText = document.getElementById(`js-input-text-${index}`);
  inputText.classList.add("done-clicked");
  const dateText = document.getElementById(`js-date-text-${index}`);
  dateText.classList.add("done-clicked");
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
