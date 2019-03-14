import React, { Component } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import axios from 'axios';
import { Route,} from 'react-router-dom';
import Nav from './components/Nav';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],    
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
      this.setState({ todos: response.data })
    })
    .catch(err => console.log(err))
  }
///////////////////////////////////////////////////////////////////////
searchForPosts = e => {
  let data = this.state.todos.filter(item => {
    if ((item.title.includes(e.target.value)) || (item.description.includes(e.target.value))) {
      return item;
    }
  });
  this.setState({ todos: data});
};

deleteTodo = id => {
    let token = localStorage.getItem(`token`)
     let headers= { 
       headers : {authorization : token }
     };
    axios
      .delete(`https://buildweek-wunderlist.herokuapp.com/api/lists/${id}`, headers)
      .then(res=> { 
        window.location.reload();
         this.props.history.push("/lists" );})
      .catch(err=> console.log(id),);
  }
///////////////////////////////////////////////////////////////////////
updateTodo =  (data,id) => {
  console.log(id)
  console.log(data)
    let token = localStorage.getItem(`token`)
     let headers= { 
       headers : {authorization : token }
     };
    axios
    .put(`https://buildweek-wunderlist.herokuapp.com/api/lists/${id}`, data ,  headers)
    .then(res => {
      this.setState({todos: res.data});
      window.location.reload();
      this.props.history.push("/lists" );
    })
    .catch(err => console.log(err) )
  }

///////////////////////////////////////////////////////////////////////
render() {
  return (
    <div className="App">
      <Route path= '/' render={() => < Nav searchForPosts = {this.searchForPosts} />} />
      <Route path ='/login' component = {Login} />
      <Route path ='/register' component = {Register} />
      <Route path ='/lists' render = {(props) => <TodoForm  {...props} updateTodo={this.updateTodo} /> }/>
      <Route path="/todo-form/:id" render={ (props) => <TodoForm {...props} updateTodo ={this.updateTodo} edit />} />
      <Route path ='/form' render = {(props) => <TodoForm  {...props} /> }/>

        {/* x////////////List View ////////// */}
      <Route exact path="/lists" render={(props) => 
          <TodoList key = {props.title}
            {...props}
            todos={this.state.todos} 
            deleteTodo={this.deleteTodo}
            updateTodo={this.updatedTodo} />} 
      />
    </div>
  );
}
}

export default App;