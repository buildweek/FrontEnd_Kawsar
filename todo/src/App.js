import React, { Component } from 'react';
import TodoList from './components/TodoList';
import axios from 'axios';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { Route,} from 'react-router-dom';
import Nav from './components/Nav';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [], 
      completed: false,
      searchResult: [],
      id : ''
    };
  }
///////////////////////////////////////////////////////////////////////

  componentDidMount(){
    var token = localStorage.getItem(`token`)
    var request = {
      headers: { authorization : token }
    }
    axios
      .get("https://buildweek-wunderlist.herokuapp.com/api/lists", request)
      .then(response => {
        console.log('cmd' ,response);
        this.setState({ todos: response.data, id: response.id })
      })
      .catch(err => console.log(err))
  }

deleteTodo = id => {
    // var token = localStorage.getItem(`token`)
    // var request = {
    //   headers: { authorization : token }
    // }
    axios
      .delete(`https://buildweek-wunderlist.herokuapp.com/api/lists/${id}`)
      .then(res=> { this.setState({todos: res.data, id: res.id}) ;
        console.log('deleteTodo', res);
         this.props.history.push("/lists" );})
      .catch(err=> console.log(err));
  }

///////////////////////////////////////////////////////////////////////
toggleCompleted = id => {
  this.setState({
    todos: this.state.todos.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    })

  });
 };
///////////////////////////////////////////////////////////////////////
clearCompleted = e => {
  e.preventDefault();
   this.setState ({
     todos: this.state.todos.filter(todo => !todo.completed)
   });
 };
 //////////////////////////////////////////////////////////////////////
 searchForLists = e => {
  const data = this.state.todos.filter(item => {
    if ((item.title.includes(e.target.value)) || (item.decription.includes(e.target.value))) {
      return item;
    }
  });
  this.setState({ searchResult: data});
};

render() {
  return (
    <div className="App">
      <Route path ='/login' component = {Login} />
      <Route path ='/register' component = {Register} />
      <Route path= '/lists' render={() => < Nav searchForLists = {this.searchForLists} />} />
      <Route exact path="/lists" render={() => 
          <TodoList 
            todos={
              this.state.searchResult.length > 0 ?
              this.state.searchResult : this.state.todos
              } 
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