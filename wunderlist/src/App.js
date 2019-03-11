import React, { Component } from 'react';
import './App.css';
import TodoForm from './components/todos/TodoForm';
import TodoList from './components/todos/TodoList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TodoForm />
        <TodoList />
      </div>
    );
  }
}

export default App;