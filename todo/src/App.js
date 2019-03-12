import React, { Component } from 'react';
import TodoList from './components/TodoList';
import axios from 'axios';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
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
    .get("https://buildweek-wunderlist.herokuapp.com/api/lists")
    .then(response => {
      this.setState({ todos: response.data })
    })
    .catch(err => console.log(err))
  }

  deleteTodo = id => {
    axios
      .delete(`https://buildweek-wunderlist.herokuapp.com/api/lists${id}`)
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
      <Route path ='/login' component = {Login} />
      <Route path ='/register' component = {Register} />
      <Route exact path= '/' component = {Nav} />
      <Route exact path="/" render={() => 
          <TodoList 
            todos={this.state.todos} 
            deleteTodo={this.deleteTodo}
            completed ={this.completed}
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