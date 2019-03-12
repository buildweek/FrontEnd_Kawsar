import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
const NavBar = styled.div` 
    display : flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    text-size: 15px;
    height: 50px;
    padding: 0px;
    background: blue;
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
    </NavBar>
   );
}

export default Nav; 