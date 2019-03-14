import React, { Component } from 'react';
import Todo from './Todo';
// import { Link } from 'react-router-dom';
import styled from 'styled-components';
const NavBar = styled.div` 
  margin: 15px;
  padding: 10px;
  .add{
    text-decoration: none;
    background: #fff233;
    border-radius: 15%;;
    margin: auto;
  }
  .add:hover{
    background: olive;
    color: white;
    width: 100px;
  }
`;
class Todos extends Component {
  render() {
    return ( 
      <NavBar className="todos">
      
      {/* <Link   to='/todo-form'><button  className='add' to='/todo-form'>Add todo</button> </Link> */}
        <h1>My Todo Lists:</h1>
        
        <ul>
          {this.props.todos.map(todo => {
            return (
              <Todo
                id={todo.id}
                title={todo.title}
                dueDate={todo.dueDate}
                description={todo.description} 
                deleteTodo={this.props.deleteTodo}
                updateTodo={this.props.updateTodo}
              />
            );
          })}
        </ul>
        
      </NavBar>
    );
  }
}

Todo.defaultProps = {
 todos: [],
};

export default Todos;
