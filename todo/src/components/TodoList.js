import React, { Component } from 'react';
import axios from 'axios';
// import styled from 'styled-components';
// const NavBar = styled.div` 

//   margin: 15px;
//   padding: 10px;
//   .todoForm{
//     min-height: 100px;
//     display: flex;
//     flex-wrap: wrap;
//     margin: auto;
//     border: 1px solid red;
//   }
//   .button{
//     width: 30%;
//     margin-top: 30px;
//   }
// `;
class TodoList extends Component {
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
    axios
      .post('http://localhost:3333/todos', this.state)
      .then(res => {
        this.props.history.push('/todos');
      })
      .catch(err => {
        console.log(err);
      })
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
        <div className = 'todoForm' >
          <form onSubmit={this.addTodo}>
           <input 
                 type ='text'
                 className ='inputbox'
                 onChange={this.handleInputChange}
                 placeholder="..add "
                 value={this.state.todo}
                 name="..to do"  
          />
          <button type= 'submit' className='button'>Add</button>
            <div>
              {this.props.todos.map((todoItem, index) => {
                            return <div
                                    style={{ textDecoration: todoItem.complete ? 'line-through' : 'none'}}
                                    onClick={e => this.props.toggleCompleted(e, index)} key={index}>

                                {todoItem.todo}
                                
                                <button onClick={() => this.props.deleteTodo(this.props.id)} >X</button>
                            </div>
                        })}
            <button className="clear-button" onClick={this.props.clearCompleted}> Clear Completed </button>
            </div>
        </form>
      </div>
    );
  }
  
}

 export default TodoList;
