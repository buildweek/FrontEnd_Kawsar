import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
const NavBar = styled.div` 
margin: 1%;

.input-form{
  display: flex;
  flex-wrap: wrap;
  width : 93%;h
  margin: 1%;
  padding: 3%;
  border-radius: 6px;
  background: rgb(243, 239, 239);
  .inputbox{
    width: 90%;
    margin: .4%;
    padding: .5rem;
    @media (min-width: 800px) {
      width: 200px;  
      margin: auto; 
    }
  }
  @media (min-width: 800px) {
    width: 800px;  
    margin: auto;   
  }
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
}
button:hover{
  background: #6195ed;
  color: white;
}
  
`;
class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      dueDate: '',
      description: ''
    };
  } 
  addTodo = event => {
    let token = localStorage.getItem(`token`)
     let headers= { 
       headers : {authorization : token }
     };
      if(this.props.edit){
        console.log('update')
        this.props.updateTodo(this.state, this.props.match.params.id); {
          alert('Note updated');
        } 
     }else {
      console.log('add')
      axios
        .post('https://buildweek-wunderlist.herokuapp.com/api/lists', this.state, headers)
        .then(res => {
          this.props.updateList(res.data);
          this.props.history.push('/lists');
        })
        .catch(err => {
          console.log(err);
        })
      }
    this.setState({
      title: '',
      dueDate: '',
      description: ''
    });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <NavBar>
      <div >
        <form className ='input-form' onSubmit={this.addTodo}>
          <input
            className ='inputbox'
            onChange={this.handleInputChange}
            placeholder="Title"
            value={this.state.title}
            name="title"
          />
          <input
            className ='inputbox'
            onChange={this.handleInputChange}
            placeholder="Due Date"
            value={this.state.dueDate}
            name="dueDate"
            type ="date"
          />
          <input
            className ='inputbox'
            onChange={this.handleInputChange}
            placeholder="Description"
            value={this.state.description}
            name="description"
          />
          <button className='button' type="submit">Add task</button>
        </form>
              
      </div>
      </NavBar>
    );
  }
}

export default TodoForm;
