/* eslint-disable max-classes-per-file, no-unused-vars, spaced-comment, no-restricted-syntax*/

class Store {
  static getItems() {
    return localStorage.getItem('todoList');
  }

  static storeItem(items) {
    // localStorage.clear('items');
    localStorage.setItem('todoList', JSON.stringify(items));
  }
}
class Todo {
  constructor(description, completed = false, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

class Operations {
  static addTodo(todos, desc, completed) {
    const todo = new Todo(desc, completed, todos.length + 1);
    todos.push(todo);
  }

  static saveItemsToLocalStorage(items) {
    localStorage.setItem('todoList', JSON.stringify(items));
  }

  static editTask(todo, value) {
    todo.description = value;
  }

  static deleteTask(oldTodos, desc) {
    const newTodos = oldTodos.filter((todo) => todo.description !== desc);
    newTodos.forEach((task) => {
      task.index = newTodos.indexOf(task) + 1;
    });
    return newTodos;
  }

  static clearAllCompleted(e, todos) {
    todos = todos.filter((todo) => !todo.completed);
    Operations.saveItemsToLocalStorage(todos);
    window.location.href = './index.html';
  }
}

const toggleCompleted = (task) => {
  task.completed = !task.completed;
};

export { Operations, Store, toggleCompleted };
