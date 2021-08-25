/* eslint-disable max-classes-per-file, spaced-comment*/
class LocalStorage {
  constructor() {
    this.store = {
      todos: [],
    };
  }

  getItem(key) {
    return this.store[key];
  }

  setItem(key, item) {
    this.store[key] = item;
  }
}

const something = {
  key: 'Enter',
  preventDefault: () => '',
};

const localStorage = new LocalStorage();
const todos = localStorage.getItem('todos');

class Store {
  static getItems() {
    return JSON.stringify(localStorage.getItem('todos'));
  }

  static storeItem(items) {
    // localStorage.clear('items');
    localStorage.setItem('todos', JSON.stringify(items));
  }
}

const input = {
  value: 'ruben',
};

const window = {
  location: {
    href: '',
  },
};

const insertTodos = () => {
  todos.forEach((todo) => {
    const parent = document.createElement('body');
    const div = document.createElement('div');
    const icon = document.createElement('i');
    icon.classList.add('task');
    const text = document.createElement('p');

    text.innerHTML = todo.description;
    const materiaIcon = document.createElement('span');
    materiaIcon.classList.add('fas', 'fa-trash-alt');

    // ToggleCompleted
    if (todo.completed) {
      icon.classList.add('fas', 'fa-check-square');
    } else {
      icon.classList.add('far', 'fa-square');
    }

    div.classList.add('item');
    div.appendChild(icon);
    div.appendChild(text);
    div.appendChild(materiaIcon);
    div.style.order = todo.index;
    parent.appendChild(div);
  });
};

export {
  LocalStorage, insertTodos, Store, something, input, window,
};
