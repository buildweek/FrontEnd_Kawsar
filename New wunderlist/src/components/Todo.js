import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
const ListBar = styled.div` 
  display: flex;
  flex-wrap: wrap;
  width: 400px;
  margin: 1% auto;
  @media (min-width: 800px) {
    width: 800px;   }
 .perList{
  flex-wrap: wrap;
  padding: 2px;
  margin: .5% auto;
  background: rgb(101, 236, 243);
  border-radius: 10px;
  width:100%;
  content-align: left; 
  @media (min-width: 800px) {
    width: 48%;  
  }
  button{
    cursor:pointer;
    display: flex;
    margin: 5px auto;
    border: 1px solid #000;
    text-align: center;
    border-radius: 6px;
    color: #6195ed;
    background:rgb(213, 236, 243);
    font-weight: bold;
    text-decoration: none;
  }
  .del-up{
    display : flex;
    flex-wrap: flex;
    width: 30%;
    margin: auto;
  }
}
`;
const Todo = props => {
  const info = {
    Todo: props.todo,
  };
  return (
    <ListBar>
      <div className="perList">
        <h3> Todo : {props.title}</h3>
        <strong>Due Date: {props.dueDate.slice(0, 10)} </strong>
        <p>Description: {props.description} </p>
        <div className= 'del-up'>
          <button onClick={() => props.deleteTodo(props.id)} >Delete</button>
          <NavLink  key = {props.title} to={`/todo-form/${props.id}`} onClick={() => props.updateTodo(props.id, info)}>
              <button> Update </button>
          </NavLink>
        </div>
      </div>
    </ListBar>
  );
};

Todo.defaultProps = {
  title: '',
  dueDate: '', 
  description: ''
};

export default Todo;

