// import React, { Component } from 'react';
// import TodoList from '../TodoList';
// import axios from 'axios';
// import { Route,} from 'react-router-dom';
// import Nav from '../Nav';

// class Secured extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       todos: [], 
//       completed: false,
//     };
//   }
// ///////////////////////////////////////////////////////////////////////

//   componentDidMount(){
//   axios
//     .get("http://localhost:3333/todos")
//     .then(response => {
//       this.setState({ todos: response.data })
//     })
//     .catch(err => console.log(err))
//   }

//   deleteTodo = id => {
//     axios
//       .delete(`http://localhost:3333/todos/${id}`)
//       .then(res=> { this.setState({todos: res.data}) ;
//          this.props.history.push("/todos" );})
//       .catch(console.log);
//   }

// ///////////////////////////////////////////////////////////////////////
// toggleCompleted = todo => {
//   this.setState(previousState => {
//     const updatedList = previousState.todos.map(toDoItem => {
//       if (toDoItem.todo === todo) {
//         toDoItem.completed = !toDoItem.completed;
//       }
//       return toDoItem;
//     });
//     return {
//       todos: updatedList
//     };
//   });
// };
// ///////////////////////////////////////////////////////////////////////
// clearCompleted = (e) =>{
//   e.preventDefault()
//   e.persist()
//   this.setState(preState =>{
//     const clearedList = preState.todos.filter(
//       todoItem => !todoItem.completed
//     );
//     return {
//       todos:  clearedList
//     };
//   });
// }
// render() {
//   return (
//     <div className="App">
//       <Route path= '/' render ={ (props)=> <Nav/> }/>
//       <Route exact path="/" render={(props) => 
//           <TodoList 
//             todos={this.state.todos} 
//             deleteTodo={this.deleteTodo}
//             completed ={this.completed}
//             toggleCompleted= {this.toggleCompleted}
//             clearCompleted={this.clearCompleted}
//             addTodo = {this.addTodo}
//            />} 
//       />
//     </div>
//   );
// }
// }
// export default Secured;