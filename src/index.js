import './style.css';
import toggleCompleted from './interactive.js';

let todos = [
  {
    description: 'Walk the Dog',
    completed: false,
    index: 1,
  },
  {
    description: 'Dinner with family',
    completed: true,
    index: 2,
  },
  {
    description: 'complete authentication in equipment application',
    completed: false,
    index: 3,
  },
];

const saveItemsToLocalStorage = (items) => {
  localStorage.setItem('todoList', JSON.stringify(items));
};

const parent = document.querySelector('.tasks');
const insertTodos = () => {
  todos.forEach((todo) => {
    const div = document.createElement('div');
    const icon = document.createElement('i');
    icon.classList.add('task');
    const text = document.createElement('p');
    text.innerHTML = todo.description;

    const span = document.createElement('span');
    span.classList.add('fas', 'fa-bars');
    if (todo.completed) {
      icon.classList.add('fas', 'fa-check-square');
      icon.addEventListener('click', (e) => {
        toggleCompleted(e, todo);
        saveItemsToLocalStorage(todos);
      });
    } else {
      icon.classList.add('far', 'fa-square');
      icon.addEventListener('click', (e) => {
        toggleCompleted(e, todo);
        saveItemsToLocalStorage(todos);
      });
    }

    div.classList.add('item');
    div.appendChild(icon);
    div.appendChild(text);
    div.appendChild(span);
    div.style.order = todo.index;
    parent.appendChild(div);
  });

  const completeAll = document.createElement('button');
  completeAll.classList.add('delete');
  completeAll.innerText = 'Clear All Completed';
  parent.appendChild(completeAll);
};

const getItemsFromStorage = () => {
  if (localStorage.getItem('todoList')) {
    todos = JSON.parse(localStorage.getItem('todoList'));
  }
  insertTodos();
};

window.onload = getItemsFromStorage();
