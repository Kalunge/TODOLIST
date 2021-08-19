/* eslint-disable max-classes-per-file, no-unused-vars, spaced-comment*/

class Todo {
  constructor(description, completed = false, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

class Operations {
  static addTodo(todos, desc, completed) {
    const todo = new Todo(desc, completed, todos.length);
    todos.push(todo);
  }

  static saveItemsToLocalStorage(items) {
    localStorage.setItem('todoList', JSON.stringify(items));
  }

  static editTask(e, parentElement, todo, todos) {
    const textInuput = document.createElement('input');
    parentElement.appendChild(textInuput);
    textInuput.focus();
    textInuput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        parentElement.removeChild(textInuput);
        parentElement.innerHTML = textInuput.value;
        todo.description = textInuput.value;
        Operations.saveItemsToLocalStorage(todos);
      }
    });
  }

  static deleteTask(e) {
    const desc = e.target.parentElement.textContent;
    const oldTodos = localStorage.getItem('todoList')
      ? JSON.parse(localStorage.getItem('todoList'))
      : [];
    const newTodos = oldTodos.filter((todo) => todo.description !== desc);
    Operations.saveItemsToLocalStorage(newTodos);
    window.location.href = '/';
  }

  static clearAllCompleted(e, todos) {
    todos = todos.filter((todo) => !todo.completed);
    Operations.saveItemsToLocalStorage(todos);
    window.location.href = '/';
  }

  static addNew(e, todos, input) {
    if (e.key === 'Enter') {
      e.preventDefault();
      todos = localStorage.getItem('todoList')
        ? JSON.parse(localStorage.getItem('todoList'))
        : [];
      Operations.addTodo(todos, input.value);
      Operations.saveItemsToLocalStorage(todos);
      input.value = '';
      input.focus();
      window.location.href = '/';
    }
  }
}

export default Operations;
