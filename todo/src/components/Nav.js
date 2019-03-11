import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
const NavBar = styled.div` 
    display : flex;
    flex-wrap: wrap;
    background: black;
    justify-content: flex-end;
    text-size: 15px;
    min-height: 20px;
    padding: 5px;
    .bar{
      margin: 15px;
      text-decoration: none;
      color: white;
      border-radius: 50%;
      padding: 10px;
    }
`;

const Nav = () => {
  return ( 
    <NavBar>
      <NavLink  className= 'bar' exact to='/'>Home</NavLink>
      <NavLink  className= 'bar' to='/todo-form'>Add Task</NavLink>
    </NavBar>
   );
}

export default Nav; 