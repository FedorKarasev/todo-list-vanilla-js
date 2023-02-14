window.addEventListener('load', () => {
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  const nameInput = document.querySelector('#name');
  const newToDoForm = document.querySelector('#new-todo-form');
  const userName = localStorage.getItem('username') || '';

  nameInput.value = userName;
  nameInput.onchange = function () {
    console.log(nameInput.value);
    localStorage.setItem('username', nameInput.value);
  };

  newToDoForm.onsubmit = function (e) {
    e.preventDefault();

    const todo = {
      content: newToDoForm.elements.content.value,
      category: newToDoForm.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    newToDoForm.reset();
    displayTodos(todos);
  };
  displayTodos(todos);
});

function displayTodos(todos) {
  const todoList = document.querySelector('#todo-list');
  todoList.innerHTML = 'No todos this moment. Add the first one.';
  if (todos.length) {
    todoList.innerHTML = '';
    todos.forEach((todo) => {
      const todoItem = document.createElement('div');
      todoItem.classList.add('todo-item');

      const label = document.createElement('label');
      const input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = todo.done;

      if (todo.done) todoItem.classList.add('done');

      const span = document.createElement('span');
      span.classList.add('bubble');
      if (todo.category == 'personal') {
        span.classList.add('personal');
      } else {
        span.classList.add('business');
      }

      const content = document.createElement('div');
      content.classList.add('todo-content');
      content.innerHTML = `<input type="text" value="${todo.content}" readonly />`;

      const actions = document.createElement('div');
      actions.classList.add('actions');

      const edit = document.createElement('button');
      edit.classList.add('edit');
      edit.innerHTML = 'Edit';

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete');
      deleteButton.innerHTML = 'Delete';

      label.append(input);
      label.append(span);
      actions.append(edit, deleteButton);

      todoItem.append(label, content, actions);
      todoList.append(todoItem);

      input.onchange = function (e) {
        todo.done = e.target.checked;
        localStorage.setItem('todos', JSON.stringify(todos));

        if (input.checked) {
          todoItem.classList.add('done');
        } else {
          todoItem.classList.remove('done');
        }
      };

      edit.onclick = (e) => {
        const input = content.querySelector('input');
        input.readOnly = false;
        input.focus();

        input.addEventListener('blur', (e) => {
          input.readOnly = true;
          todo.content = e.target.value;
          localStorage.setItem('todos', JSON.stringify(todos));
        });
      };

      deleteButton.onclick = (e) => {
        todos = todos.filter((t) => t != todo);
        displayTodos(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
      };
    });
  }
}
