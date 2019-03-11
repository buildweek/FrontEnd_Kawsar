import React from 'react';

const Todo = props => {

  return (
    <div className="todo">
      <h3>{props.todo} <button onClick={() => props.deleteTodo(props.id)} >X</button> </h3>
    </div>
  );
};

Todo.defaultProps = {
  todo: '',
 
};

export default Todo;

