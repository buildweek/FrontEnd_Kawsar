import React from 'react';
import { NavLink } from 'react-router-dom';

const Todo = props => {
  const info = {
    Todo: props.todo,
  };
  return (
    <div className="Smurf">
      <h1> My task List</h1>
      <h3>{props.todo}</h3>

      <button onClick={() => props.deleteTodo(props.id)} >Delete</button>
      <NavLink to={`/todo-form/${props.id}`} onClick={() => props.updateTodo(props.id, info)}>
          <button> Update </button>
       </NavLink>
    </div>
  );
};

Todo.defaultProps = {
  todo: '',
 
};

export default Todo;

