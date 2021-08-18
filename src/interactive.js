const toggleCompleted = (e, task) => {
  if (e.target.classList.contains('fas')) {
    e.target.classList.value = 'task far fa-square';
    task.completed = !task.completed;
  } else {
    e.target.classList.value = 'task fas fa-check-square';
    task.completed = !task.completed;
  }
};

export default toggleCompleted;
