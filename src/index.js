/* eslint-disable max-classes-per-file, no-unused-vars, spaced-comment*/
import './style.css';
import { Store, Operations, toggleCompleted } from './operations.js';

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
    text.classList.add('origin');

    // Edit Task
    text.addEventListener('click', (e) => {
      let counter = 0;
      if (text.classList.contains('origin')) {
        const textInuput = document.createElement('input');
        text.parentElement.appendChild(textInuput);
        textInuput.focus();
        textInuput.addEventListener('blur', (e) => {
          text.parentElement.removeChild(textInuput);
          text.innerHTML = textInuput.value;
          todo.description = textInuput.value;
          Operations.editTask(todo, textInuput.value);
          Operations.saveItemsToLocalStorage(todos);
        });
      }
      counter += 1;
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
      window.location.href = './index.html';
    });

    // ToggleCompleted
    if (todo.completed) {
      icon.classList.add('fas', 'fa-check-square');
      icon.addEventListener('click', (e) => {
        if (e.target.classList.contains('fas')) {
          e.target.classList.value = 'task far fa-square';
          toggleCompleted(todo);
          saveItemsToLocalStorage(todos);
        } else {
          e.target.classList.value = 'task fas fa-check-square';
          toggleCompleted(todo);
          saveItemsToLocalStorage(todos);
        }
      });
    } else {
      icon.classList.add('far', 'fa-square');
      icon.addEventListener('click', (e) => {
        if (e.target.classList.contains('fas')) {
          e.target.classList.value = 'task far fa-square';
          toggleCompleted(todo);
          saveItemsToLocalStorage(todos);
        } else {
          e.target.classList.value = 'task fas fa-check-square';
          toggleCompleted(todo);
          saveItemsToLocalStorage(todos);
        }
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
    Operations.saveItemsToLocalStorage(Operations.clearAllCompleted(todos));
    window.location.href = './index.html';
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
    window.location.href = './index.html';
  }
});

document.addEventListener('DOMContentLoaded', getItemsFromStorage());
