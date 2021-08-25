/* eslint-disable  spaced-comment, import/no-extraneous-dependencies */

import { expect, it } from '@jest/globals';
import { Operations } from '../operations.js';

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
      ])
    );
  });
});
