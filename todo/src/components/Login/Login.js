import React from 'react';
import styled from 'styled-components';
import { Button, Form } from 'reactstrap';
const LoginBar = styled.div`
      display : flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      width : 100%;
      .login-form{
          display: flex;
          flex-wrap: wrap;
          width: 30%;
          margin: 5% 20% 0 0;
          justify-content: center;
          border: 1px solid rgb(240, 229, 229);
          padding: 5% 0 5% 0;
          h1{
              font-size: 35px;
              font-family: Luminari, 'fantasy' ;
          }
          .input-form{
              width : 70%;
              margin: 1%;
              padding: 3%;
              border-radius: 6px;
              background: rgb(243, 239, 239);
          }
          button{
              width: 70%;
              margin: 2%;
              padding: 2%;
              border-radius: 6px;
            //   background: rgb(144, 144, 236);
              font-weight: bold;
              font-size: 14px;
          }
          button:hover{
              background: pink;
              color: rgb(10, 10, 82);
          }
          .textp{
              border: 1px solid rgb(240, 229, 229);
              width: 70%;
              text-align: center;
              margin: 2%;
          }
      }

`;

class Login extends React.Component {
  constructor() {
      super();
      this.state = {
          username: '',
          password: ''
      }
  }
  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value })
  };
  handlePassword = e => {
      localStorage.setItem('user', this.state.username);
      localStorage.setItem('password', this.state.password);
      window.location.reload();
    };
  render(){
    return(
      <LoginBar className ='login-box'>
          <Form  className ='login-form'>
              <h1 > Welcome to WunderList</h1>
              <input 
                  className ='input-form'
                  type="text"
                  placeholder="username or email"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInput}
              />
              <input
                  className ='input-form'
                  type= 'password'
                  placeholder= 'Password'
                  name='password'
                  value={this.state.password}
                  onChange={this.handleInput} 
              />
              
              <Button color = 'success' onClick={this.handlePassword}>Log in</Button>
              <span className= 'textp'> <p> Don't have and account ? <strong>Sign up</strong></p></span>
          </Form>
      </LoginBar>
    );
  }

}  

export default Login;