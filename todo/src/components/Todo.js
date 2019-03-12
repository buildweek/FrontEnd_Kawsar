import React from 'react';


const Todo = props => {
  return (
    <div 
      onClick={() => {props.toggleTodo(props.todo.id)}}
      className={`todo ${props.todo.complete ? "completed" : null}`}
    >
      <div>
        {props.todo.text} 
      </div>
      <div onClick={() => {props.deleteTodo(props.todo.id)}} className="cross">X</div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    todos: state
  }
}

export default (Todo);