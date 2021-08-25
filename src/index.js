/* eslint-disable max-classes-per-file, no-unused-vars, spaced-comment*/
import './style.css';
import toggleCompleted from './interactive.js';
import { Store, Operations } from './operations.js';

let todos = [];

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

    // Edit Task
    text.addEventListener('click', (e) => {
      Operations.editTask(e, text, todo, todos);
    });

    text.innerHTML = todo.description;
    const materiaIcon = document.createElement('span');
    materiaIcon.classList.add('fas', 'fa-trash-alt');

    // Delete task
    materiaIcon.addEventListener('click', (e) => {
      const desc = e.target.parentElement.textContent;
      const oldTodos = localStorage.getItem('todoList')
        ? JSON.parse(localStorage.getItem('todoList'))
        : [];
      const newTodos = Operations.deleteTask(oldTodos, desc);
      Operations.saveItemsToLocalStorage(newTodos);
      window.location.href = '/';
    });

    // ToggleCompleted
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
    div.appendChild(materiaIcon);
    div.style.order = todo.index;
    parent.appendChild(div);
  });

  // Dont show edit if no todos
  const editArea = document.querySelector('.togglevisibility');
  if (todos.length === 0) {
    editArea.style.display = 'none';
  }

  // MCLEAR ALL COMPLETE
  const completeAll = document.createElement('button');
  completeAll.classList.add('delete');
  completeAll.innerText = 'Clear All Completed';
  parent.appendChild(completeAll);
  completeAll.addEventListener('click', (e) => {
    Operations.clearAllCompleted(e, todos);
  });
};

const getItemsFromStorage = () => {
  if (localStorage.getItem('todoList')) {
    todos = JSON.parse(localStorage.getItem('todoList'));
  }
  insertTodos();
};

const input = document.querySelector('input');

input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const todos = localStorage.getItem('todoList')
      ? JSON.parse(localStorage.getItem('todoList'))
      : [];
    Operations.addTodo(todos, input.value);
    Store.storeItem(todos);
    input.value = '';
    window.location.href = '/';
  }
});

document.addEventListener('DOMContentLoaded', getItemsFromStorage());
