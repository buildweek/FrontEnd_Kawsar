import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const BorderBar = styled.div`
min-height: 400px;
margin: 1%;

.input-form{
  display: flex;
  flex-wrap: wrap;
  width : 93%;
  margin: 1%;
  padding: 3%;
  border-radius: 6px;
  background: rgb(243, 239, 239);
  .inputbox{
    width: 90%;
    margin: .4%;
    padding: .5rem;
  }
}
button{
  cursor:pointer;
  display: flex;
  margin: 5px auto;
  width: 100px;
  text-align: center;
  border-radius: 6px;
  color: #6195ed;
  background:rgb(213, 236, 243);
}
button:hover{
  background: #6195ed;
  color: white;
}
.todo-tabs {
  width: 60%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  background: rgb(213, 236, 243);
  border-radius: 6px;
}
.todo-tabs h3 {
  cursor:pointer;
  width: 30%;
  font-size: 13px;
  font-weight: normal;
  text-align: center;
  background-color: rgb(213, 236, 243);
  transition: box-shadow .2s, background-color .2s;
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
  background-color: blue;
   height: 20px;
}

.completed div:not(.cross) {
  text-decoration: line-through;
  opacity: .4;
 
}

.todo-tabs .selected {
  background-color: #6195ed;
  box-shadow: inset 3px 3px 5px rgb(0, 0, 0, .25);
  height: 20px;
  color: white;
  border-radius: 5px;
}    
`;
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      ddate: '',
      des : '',
      show: 'all'
    };
  } 
  
  
  addTodo = event => {
    event.preventDefault();
    var token = localStorage.getItem(`token`)
    var request = {
      headers: { authorization : token }
    }
    axios
      .post('https://buildweek-wunderlist.herokuapp.com/api/lists', this.state, request )
      .then(res => {
        console.log(res);
        this.props.history.push('/lists');
      })
      .catch(err => {
        console.log(err);
      })
    this.setState({
      title: '',
      ddate: '',
      des : '',
    });
  }

  handleInputChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value 
    });
  }
  toggleShow = tab => {
    this.setState({ show: tab })
  }
    render() {
      return (
        <BorderBar >
          <form  onSubmit={this.addTodo}>
          <div className= 'input-form'>
           <input 
                 type ='text'
                 className ='inputbox'
                 onChange={this.handleInputChange}
                 placeholder="Task "
                 value={this.state.title}
                 name='title'  
          />
          <input 
                 type ='date'
                 className ='inputbox'
                 onChange={this.handleInputChange}
                 placeholder="Due Date"
                 value={this.state.date}
                 name="ddates"  
          />
          <input 
                 type ='text'
                 className ='inputbox'
                 onChange={this.handleInputChange}
                 placeholder="Description "
                 value={this.state.des}
                 name="des"  
          />
          <button type= 'submit' className='add-button'>Add</button>
          </div>
          
            <div>
              {this.state.show === 'all' ? this.props.todos.map((todoItem, index) => {
                            return <div
                                    style={{ textDecoration: todoItem.complete ? 'line-through' : 'none'}}
                                    onClick={e => this.props.toggleCompleted(e, index)} key={index}>

                                    {todoItem.title}  
                                    {todoItem.des}
                                    {todoItem.ddate}

                                    <button onClick={() => this.props.deleteTodo(this.props.id)} className="cross">X</button>
                                  </div> }) :

              this.props.todos.filter(todo => todo.complete === this.state.show).map((todoItem, index) => {
                          return <div>
                                  {todoItem.title}
                                  {todoItem.des}
                                  {todoItem.ddate}
                                  </div>
                        } )
              }
            
            <div className="todo-tabs">
              <h3 onClick={() => this.toggleShow('all')} className={this.state.show === 'all' ? 'selected' : null} >All</h3>
              <h3 onClick={() => this.toggleShow(true)}  className={this.state.show === true ? 'selected' : null } >Completed</h3>
              <h3 onClick={() => this.toggleShow(false)} className={this.state.show === false ? 'selected' : null} >Unfinished</h3>
            </div>
            <button className="clear-button" onClick={this.props.clearCompleted}> Clear Completed </button>

  
            </div>
        </form>
      </BorderBar>
    );
  } 
}

export default TodoList;
