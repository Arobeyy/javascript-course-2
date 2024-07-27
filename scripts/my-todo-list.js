const todoList = [];

renderTodoList();

function renderTodoList() {
  let todoListHtml = ``;

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const html = `
        <div>&bull; ${todoObject.name} </div>
        <div>due: ${todoObject.dueDate} </div>
        <button id = "doneButton" onclick = "
          addClassToButton();
        " class = "done-todo-button">Done</button>
        <button onclick = "
          todoList.splice(${i}, 1);
          renderTodoList();  
        " class = "delete-todo-button">Delete</button>
    `;
    todoListHtml += html;
  }
  document.querySelector('.js-todo-list').innerHTML = todoListHtml;
}

function addClassToButton() {
  const button = document.getElementById('doneButton');
  button.classList.add('clicked');
}

function addTodo() {
  const nameInputElement = document.querySelector('.js-name-input');
  const name = nameInputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  // Check if name is empty
  if (name.trim() !== '') {
    const todo = {
      name: name,
      dueDate: dueDate
    };
    todoList.push(todo);
    console.log(todoList);

    // Clear the input fields after adding the todo
    nameInputElement.value = '';
    dateInputElement.value = '';

    renderTodoList();
  } else {
    alert('Please enter a name for the todo.');
  }

}