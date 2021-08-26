/* eslint-disable  spaced-comment, import/no-extraneous-dependencies */

import { expect, it } from '@jest/globals';
import { Operations, toggleCompleted } from '../operations.js';

describe('adding an item', () => {
  const todos = [];
  it('adding new one', () => {
    const desc = 'new Tod';
    Operations.addTodo(todos, desc);
    expect(todos).toEqual([
      { description: 'new Tod', completed: false, index: 1 },
    ]);
  });

  it('adding a second', () => {
    const desc = 'another one';
    Operations.addTodo(todos, desc);
    expect(todos).toEqual([
      { description: 'new Tod', completed: false, index: 1 },
      { description: 'another one', completed: false, index: 2 },
    ]);
  });

  it('adding a third', () => {
    const desc = 'third one';
    Operations.addTodo(todos, desc);
    expect(todos).toEqual([
      { description: 'new Tod', completed: false, index: 1 },
      { description: 'another one', completed: false, index: 2 },
      { description: 'third one', completed: false, index: 3 },
    ]);
  });
});

describe('deleting a task', () => {
  const todos = [
    { description: 'new Task', completed: false, index: 0 },
    { description: 'Old task', completed: false, index: 1 },
    { description: 'take out trash', completed: false, index: 2 },
    { description: 'dinner with wife', completed: false, index: 3 },
    { description: 'walk the dog', completed: false, index: 4 },
  ];

  it('deleting one', () => {
    expect(Operations.deleteTask(todos, todos[0].description).length).toBe(4);
  });

  it(' deletes specific one', () => {
    expect(Operations.deleteTask(todos, todos[0].description)).toEqual(
      expect.not.arrayContaining([
        {
          description: 'new Task',
          completed: false,
          index: 0,
        },
      ]),
    );
  });
});

describe('deleting a task', () => {
  const todos = [
    { description: 'new Task', completed: false, index: 1 },
    { description: 'Old task', completed: false, index: 2 },
    { description: 'take out trash', completed: false, index: 3 },
    { description: 'dinner with wife', completed: false, index: 4 },
    { description: 'walk the dog', completed: false, index: 5 },
  ];
  it('deleting one', () => {
    expect(Operations.deleteTask(todos, todos[0].description).length).toBe(4);
  });
  it(' deletes specific one', () => {
    expect(Operations.deleteTask(todos, todos[0].description)).toEqual(
      expect.not.arrayContaining([
        {
          description: 'new Task',
          completed: false,
          index: 0,
        },
      ]),
    );
  });

  it('rearrange indexes after deleting third item', () => {
    const newArr = Operations.deleteTask(todos, todos[2].description);
    expect(newArr).toEqual([
      { description: 'new Task', completed: false, index: 1 },
      { description: 'Old task', completed: false, index: 2 },
      { description: 'dinner with wife', completed: false, index: 3 },
      { description: 'walk the dog', completed: false, index: 4 },
    ]);
  });

  it('rearrange indexes after deleting first item', () => {
    const newArr = Operations.deleteTask(todos, todos[0].description);
    expect(newArr[0]).toHaveProperty('index', 1);
    expect(newArr[0]).toHaveProperty('description', 'Old task');
  });
});

describe('Editing a task', () => {
  const todo = { description: 'dinner with wife', completed: false, index: 4 };

  it('Changes the description of a task', () => {
    Operations.editTask(todo, 'dinner with dog');
    expect(todo.description).toEqual('dinner with dog');
  });

  it('Changes description from "walk the dog" to "walk alone"', () => {
    Operations.editTask(todo, 'walk alone');
    expect(todo).toEqual({
      description: 'walk alone',
      completed: false,
      index: 4,
    });
  });
});

describe('Toggle Completed', () => {
  const todos = [
    { description: 'new Task', completed: false, index: 1 },
    { description: 'Old task', completed: false, index: 2 },
    { description: 'take out trash', completed: true, index: 3 },
    { description: 'dinner with wife', completed: true, index: 4 },
    { description: 'walk the dog', completed: false, index: 5 },
  ];

  it('Toggle one "false" to "true', () => {
    toggleCompleted(todos[1]);
    expect(todos[1].completed).toBeTruthy();
  });

  it('Toggle one "true" to "false"', () => {
    toggleCompleted(todos[3]);
    expect(todos[3].completed).toBeFalsy();
  });

  const tasks = [
    { description: 'new Task', completed: false, index: 1 },
    { description: 'Old task', completed: false, index: 2 },
    { description: 'take out trash', completed: true, index: 3 },
    { description: 'dinner with wife', completed: true, index: 4 },
    { description: 'walk the dog', completed: false, index: 5 },
  ];

  it('Multi-toggle', () => {
    toggleCompleted(tasks[1]);
    toggleCompleted(tasks[2]);
    toggleCompleted(tasks[4]);
    expect(tasks).toEqual([
      { description: 'new Task', completed: false, index: 1 },
      { description: 'Old task', completed: true, index: 2 },
      { description: 'take out trash', completed: false, index: 3 },
      { description: 'dinner with wife', completed: true, index: 4 },
      { description: 'walk the dog', completed: true, index: 5 },
    ]);
  });
});

describe('clear all completed', () => {
  let myTasks = [
    { description: 'new Task', completed: false, index: 1 },
    { description: 'Old task', completed: false, index: 2 },
    { description: 'take out trash', completed: true, index: 3 },
    { description: 'dinner with wife', completed: true, index: 4 },
    { description: 'walk the dog', completed: false, index: 5 },
  ];

  it('array to contain only nonCompleted tasks', () => {
    myTasks = Operations.clearAllCompleted(myTasks);
    expect(myTasks).toEqual([
      { description: 'new Task', completed: false, index: 1 },
      { description: 'Old task', completed: false, index: 2 },
      { description: 'walk the dog', completed: false, index: 5 },
    ]);
  });

  it('not equal to array containing completed tasks', () => {
    myTasks = Operations.clearAllCompleted(myTasks);
    expect(myTasks).not.toEqual([
      { description: 'new Task', completed: true, index: 1 },
      { description: 'Old task', completed: false, index: 2 },
      { description: 'walk the dog', completed: true, index: 5 },
    ]);
  });
});
