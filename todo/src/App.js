import React, { Component } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import axios from 'axios';
import { Route,} from 'react-router-dom';
import Nav from './components/Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [], 
      completed: false,
    };
  }
///////////////////////////////////////////////////////////////////////

  componentDidMount(){
  axios
    .get("http://localhost:3333/todos")
    .then(response => {
      this.setState({ todos: response.data })
    })
    .catch(err => console.log(err))
  }
/////////////////////////////////////////////////////////////////////
  // addTodo = todo =>{
  //   axios
  //     .post('http://localhost:3333/todos', todo)
  //     .then(res=> {this.setState({todos: res.data})})
  //     .catch(console.log);
  // }
///////////////////////////////////////////////////////////////////////
  deleteTodo = id => {
    axios
      .delete(`http://localhost:3333/todos/${id}`)
      .then(res=> { this.setState({todos: res.data}) ;
         this.props.history.push("/todos" );})
      .catch(console.log);
  }

///////////////////////////////////////////////////////////////////////
toggleCompleted = todo => {
  this.setState(previousState => {
    const updatedList = previousState.todos.map(toDoItem => {
      if (toDoItem.todo === todo) {
        toDoItem.completed = !toDoItem.completed;
      }
      return toDoItem;
    });
    return {
      todos: updatedList
    };
  });
};
///////////////////////////////////////////////////////////////////////
clearCompleted = (e) =>{
  e.preventDefault()
  e.persist()
  this.setState(preState =>{
    const clearedList = preState.todos.filter(
      todoItem => !todoItem.completed
    );
    return {
      todos:  clearedList
    };
  });
}
render() {
  return (
    <div className="App">
      <Route path= '/' render ={ (props)=> <Nav/> }/>
      <Route exact path="/" render={(props) => 
          <TodoList 
            {...props}
            todos={this.state.todos} 
            deleteTodo={this.deleteTodo}
            completed ={this.state.completed}
            toggleCompleted= {this.toggleCompleted}
            clearCompleted={this.clearCompleted}
            addTodo = {this.addTodo}
           />} 
      />
    </div>
  );
}
}
export default App;