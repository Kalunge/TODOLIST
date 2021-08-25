class LocalStorage {
  constructor() {
    this.todos = [];
  }

  static getItem(key) {
    return this.store[key];
  }

  static setItem(key, item) {
    this.store[key] = item;
  }
}

const todos = LocalStorage.getItem('todos');

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

export { LocalStorage, insertTodos };
