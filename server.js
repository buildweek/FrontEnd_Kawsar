const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3333;
 
const server = express();
server.use(bodyParser.json());
server.use(cors());

const sendUserError = (msg, res) => {
  res.status(422);
  res.json({ Error: msg });
  return;
};

let todos = [
  {
    id: 1,
    todo: 'Have to code',
  }
];
server.get('/todos', (req, res) => {
  res.json(todos);
});
let todoId = 1;

server.post('/todos', (req, res) => {
  const { todo} = req.body;
  const newTodo = { todos, id: todoId };
  if (!todo) {
    return sendUserError(
      'Ya gone required to do.',
      res
    );
  }
  const findTodoByName = todo => {
    return todo.todo === todo;
  };
  if (todos.find(findTodoByName)) {
    return sendUserError(
      `Ya gone did! ${todo} already exists in the list.`,
      res
    );
  }

  todos.push(newTodo);
  todoId++;
  res.json(todos);
});

server.put('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;
  const findTodoById = todo => {
    return todo.id == id;
  };
  const foundTodo = todos.find(findTodoById);
  if (!foundTodo) {
    return sendUserError('No todo found by that ID', res);
  } else {
    if (name) foundTodo.todo = todo;
    res.json(todos);
  }
});

server.delete('/todos/:id', (req, res) => {
  const { id } = req.params;
  const foundTodo = todos.find(todo => todo.id == id);

  if (foundTodo) {
    const TodoRemoved = { ...foundTodo };
    todos = todos.filter(todo => todo.id != id);
    res.status(200).json(todos);
  } else {
    sendUserError('No todo by that ID exists in the todo DB', res);
  }
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`server is listening on port ${port}`);
});
