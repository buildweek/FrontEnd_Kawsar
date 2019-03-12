import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const BorderBar = styled.div`
.todo-tabs {
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
todo-tabs h3 {
  width: 30%;
  height: 32px;
  font-size: 18px;
  font-weight: normal;
  text-align: center;
  background-color: rgb(213, 236, 243);
  transition: box-shadow .2s, background-color .2s;
}

.todo-tabs h2:nth-of-type(-n+2) {
  border-right: 1px solid #000;
}
.cross {
  border: 1px solid #000;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-weight: bold;
  background-color: rgb(213, 236, 243);
}
.completed {
  background-color: rgba(201, 200, 200, .4);
}

.completed div:not(.cross) {
  text-decoration: line-through;
  opacity: .4;
}

.todo-tabs .selected {
  background-color: rgb(94, 155, 173);
  box-shadow: inset 3px 3px 5px rgb(0, 0, 0, .25);
}    
`;
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
      show: 'all'
    };
  } 
  
  
  addTodo = event => {
    event.preventDefault();
    axios
      .post('https://buildweek-wunderlist.herokuapp.com/api/lists', this.state.todo)
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
  toggleShow = tab => {
    this.setState({ show: tab })
  }
    render() {
      return (
        <BorderBar >
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
              {this.state.show === 'all' ? this.props.todos.map((todoItem, index) => {
                            return <div
                                    style={{ textDecoration: todoItem.complete ? 'line-through' : 'none'}}
                                    onClick={e => this.props.toggleCompleted(e, index)} key={index}>

                                    {todoItem.todo}           
                                    <button onClick={() => this.props.deleteTodo(this.props.id)} className="cross">X</button>
                                  </div> }) :

              this.props.todos.filter(todo => todo.complete === this.state.show).map((todoItem, index) => {
                          return <div>
                                  {todoItem.todo}
                                  </div>
                        } )
              }
            <button className="clear-button" onClick={this.props.clearCompleted}> Clear Completed </button>
            <div className="todo-tabs">
              <h3 onClick={() => this.toggleShow('all')} className={this.state.show === 'all' ? 'selected' : null} >All</h3>
              <h3 onClick={() => this.toggleShow(true)}  className={this.state.show === true ? 'selected' : null } >Completed</h3>
              <h3 onClick={() => this.toggleShow(false)} className={this.state.show === false ? 'selected' : null} >Unfinished</h3>
            </div>

  
            </div>
        </form>
      </BorderBar>
    );
  } 
}

export default TodoList;
