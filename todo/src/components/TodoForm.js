import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
const NavBar = styled.div` 

  margin: 15px;
  padding: 10px;
  
  .todoForm{
    min-height: 100px;
    display: flex;
    flex-wrap: wrap;
  justify-content:flex-end;
  }
  .button{
    width: 30%;
    margin-top: 30px;
  }
`;
class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
    };
  } 
  componentDidMount = () => {
    if(this.props.info) this.setState({todo: this.props.info.todo});
  }
  addTodo = event => {
    event.preventDefault();
    if(this.props.updateList) {
      axios.post('http://localhost:3333/todos', this.state)
      .then(res => {
        this.props.updateList(res.data);
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      })
    } else if(this.props.updateTodo) {
      this.props.updateTodo(this.state);
      this.props.history.push('/');
    }
    this.setState({
      todo: '',
    });
  }

  handleInputChange = e => {
    this.setState({
      ...this.state,
      todo: e.target.value
    });
  }

  render() {
    return (
      <NavBar>
      <div className = 'todoForm'>
        <form onSubmit={this.addTodo}>
          <input
            onChange={this.handleInputChange}
            placeholder="..add to the list"
            value={this.state.todo}
            name="..todo"
          /> 
          <button className='button' type="submit">Add</button>
        </form>
      </div>
      </NavBar>
    );
  }
}

export default TodoForm;
