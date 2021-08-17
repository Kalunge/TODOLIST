import _ from 'lodash';
import './style.css';

const todos = [
  {
    description: 'Walk the Dog',
    completed: true,
    index: 1,
  },
  {
    description: 'Dinner with family',
    completed: false,
    index: 2,
  },
  {
    description: 'complete authentication in equipment app',
    completed: false,
    index: 3,
  },
];


const parent = document.querySelector('.tasks');
const insertTodos = () => {
  todos.forEach((todo) => {
    const div = document.createElement('div')
    
    const icon = document.createElement('i')
    todo.completed
      ? icon.classList.add('fas', 'fa-check')
      : icon.classList.add('far', 'fa-square');

    const text = document.createElement('p')
    text.innerHTML = todo.description

    const span = document.createElement('span');
    span.classList.add('fas', 'fa-bars');

    div.classList.add('item')
    div.appendChild(icon);
    div.appendChild(text);
    div.appendChild(span);
    div.style.order = todo.index
    parent.appendChild(div)
  });

  const completeAll = document.createElement('button')
  completeAll.classList.add('delete')
  completeAll.innerText = 'Clear All Completed'
  parent.appendChild(completeAll)
};

insertTodos();
