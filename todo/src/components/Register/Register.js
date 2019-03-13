import React from 'react';
import styled from 'styled-components';
import { Button, Form } from 'reactstrap';
import axios from 'axios';

class Register extends React.Component {
  constructor() {
      super();
      this.state = {
          username: '',
          password: '',
          confirmPassword: ''
      };
  }
  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value })
  };
  handlePassword = e => {
       axios
        .post('https://buildweek-wunderlist.herokuapp.com/api/register', this.state)
        .then(res => { 
          localStorage.setItem("token", res.data.token);
          this.props.history.push(`/login`);
       })
       .catch(err => console.log(err))
    };
  render(){
    return(
      <RegisterBar className ='login-box'>
          <Form  className ='login-form' onSubmit={this.handlePassword}>
          <div className='input-form' >
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
              <input
                  className ='input-form'
                  type= 'password'
                  placeholder= 'Confirm Password'
                  name='confirmPassword'
                  value={this.state.confirmPassword}
                  onChange={this.handleInput} 
              />
              <Button color = 'success' onClick={this.handlePassword}> Register</Button>  
              </div>  
          </Form>
      </RegisterBar>
    );
  }
}  
export default Register;

const RegisterBar = styled.div`
      display : flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      width : 100%;
      .login-form{
          display: flex;
          flex-wrap: wrap;
          width: 70%;
          margin: 5% 20% 0 0;
          justify-content: center;
          border: 1px solid rgb(240, 229, 229);
          padding: 5% 0 5% 0;
          @media (min-width: 800px) {
            width: 30%;
         }
          h1{
              font-size: 35px;
              
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
              font-weight: bold;
              font-size: 14px;
          }
          button:hover{
              background: grey;
              color: white;
          }
          .textp{
              width: 70%;
              text-align: center;
              margin: 2%;
          }
      }

`;