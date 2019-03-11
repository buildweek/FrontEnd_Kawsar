import React, { Component } from 'react';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import axios from 'axios';
import { Route,} from 'react-router-dom';
import Nav from './components/Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [], 
      updatedTodo : {}
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
  addTodo = todo =>{
    axios
      .post('http://localhost:3333/todos', todo)
      .then(res=> {this.setState({todos: res.data})})
      .catch(console.log);
  }
///////////////////////////////////////////////////////////////////////
  deleteTodo = id => {
    axios
      .delete(`http://localhost:3333/todos/${id}`)
      .then(res=> { this.setState({todos: res.data}) ;
         this.props.history.push("/" );})
      .catch(console.log);
  }
///////////////////////////////////////////////////////////////////////
  setUpdatedTodo = (id, todo) => {
    todo.id = id;
    this.setState({updatedTodo: todo});
  }

  updateTodo = (todo) => {
    axios.put(`http://localhost:3333/todos/${this.state.updatedTodo.id}`, todo)
    .then(res => {
      this.setState({todos: res.data});
    })
    .catch(err => {
      console.log(err);
    })
  }
  updateList = (todoList) => {
    this.setState({todos: todoList});
  }

///////////////////////////////////////////////////////////////////////
render() {
  return (
    <div className="App">
      <Route path= '/' render ={ (props)=> <Nav/> }/>
      
      <Route exact path="/todo-form" render ={ (props) => 
          <TodoForm updateList={this.updateList} {...props}/>} 
      />
      <Route path="/todo-form/:id" render={ (props) => 
          <TodoForm 
            updateTodo={this.updateTodo} 
            info={this.state.updatedTodo}
            {...props}/>} 
      />
      <Route exact path="/" render={(props) => 
          <TodoList 
            {...props}
            todos={this.state.todos} 
            loading={this.state.loading} 
            deleteTodo={this.deleteTodo}
            updateTodo={this.setUpdatedTodo} />} 
      />
    </div>
  );
}
}
export default App;