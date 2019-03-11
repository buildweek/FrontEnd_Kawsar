import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from './../actions';

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputItem: 'add task'
    }
  }

  handleIChange = (e) => {
    this.setState({ inputItem: e.target.value })
  }

  addTodo = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.inputItem);
    this.setState({ input: '' })
  }

  render() {
    return (
      <div className="todo-form">
        <form onSubmit={(e) => {this.addTodo(e)}}>
          <input 
            onChange={this.handleChange} 
            type="text" 
            value={this.state.input}>
          </input>
          
          <button type="submit">Add task</button>
          
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}

export default connect(mapStateToProps, { addTodo })(TodoForm); 