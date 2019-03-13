import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = (props) => {
  return ( 
    <NavBar>
      <div className= 'wrapper'>
      <NavLink  className= 'bar' exact to='/'> Home </NavLink>
      <div className= 'search' >
                        <input  className = 'input-search'
                                name = 'input search'
                                id='search-bar' 
                                type="search"        
                                placeholder= " 🔍 Search your tasks"
                                onKeyDown={props.searchForLists}
                            />
      </div>
      </div>
    </NavBar>
   );
}

export default Nav; 

const NavBar = styled.div` 
    display : flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    text-size: 15px;
    height: 50px;
    padding: 0px;
    background: blue;
    width: 100%;
    .wrapper{
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end
    }
    .bar{
      margin: 15px;
      text-decoration: none;
      color: white;
      margin: auto;
      width: 10%;
    }
    .search{
      width: 50%;
      margin: auto;
      .input-search{
        width: 70%;
        height: 70px;
        text-align: center;
      }
    }
`;
