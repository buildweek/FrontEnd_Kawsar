import React, { Component } from 'react';
import axios from 'axios';
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
      show: 'all'
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
  toggleShow = tab => {
    this.setState({ show: tab })
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
              {this.state.show === 'all' ? this.props.todos.map((todoItem, index) => {
                            return <div
                                    style={{ textDecoration: todoItem.complete ? 'line-through' : 'none'}}
                                    onClick={e => this.props.toggleCompleted(e, index)} key={index}>

                                    {todoItem.todo}           
                                    <button onClick={() => this.props.deleteTodo(this.props.id)} >X</button>
                                  </div> }) :
                                  
              this.props.todos.filter(todo => todo.complete === this.state.show).map((todoItem, index) => {
                          return <div>
                                  {todoItem.todo}
                                  </div>
                        } )
              }
            <button className="clear-button" onClick={this.props.clearCompleted}> Clear Completed </button>
            <div className="todo-tabs">
              <h2 onClick={() => this.toggleShow('all')} className={this.state.show === 'all' ? 'selected' : null} >All</h2>
              <h2 onClick={() => this.toggleShow(true)}  className={this.state.show === true ? 'selected' : null } >Completed</h2>
              <h2 onClick={() => this.toggleShow(false)} className={this.state.show === false ? 'selected' : null} >Unfinished</h2>
            </div>

  
            </div>
        </form>
      </div>
    );
  }
  
}

 export default TodoList;
