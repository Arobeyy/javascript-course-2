const todoList = [];

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
  } else {
    alert('Please enter a name for the todo.');
  }

}