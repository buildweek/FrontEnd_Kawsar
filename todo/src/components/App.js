import React, { Component } from "react";
import Secured from './components/Secured/Secured';
import Auth from './components/Authentication/Auth';
import Login from './components/Login/Login';
import styled from 'styled-components';

const AppBar = styled.div`
     text-align: center;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <AppBar className="App">

            < WithAuthentication />

      </AppBar>
    );
  }
}

const WithAuthentication = Auth(Secured)(Login);
export default App;
