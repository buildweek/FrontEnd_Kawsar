// import React, { Component } from 'react';
// import axios from 'axios';
// import styled from 'styled-components';
// const NavBar = styled.div` 

//   margin: 15px;
//   padding: 10px;
//   .todoForm{
//     min-height: 100px;
//     display: flex;
//     flex-wrap: wrap;
//     margin: auto;
//     border: 1px solid red;
//   }
//   .button{
//     width: 30%;
//     margin-top: 30px;
//   }
// `;
// class TodoForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       todo: '',
//     };
//   } 
//   componentDidMount = () => {
//     if(this.props.info) this.setState({todo: this.props.info.todo});
//   }
//   addTodo = event => {
//     event.preventDefault();
//     axios
//       .post('http://localhost:3333/todos', this.state)
//       .then(res => {
//         this.props.updateList(res.data);
//         this.props.history.push('/');
//       })
//       .catch(err => {
//         console.log(err);
//       })
//     this.setState({
//       todo: '',
//     });
//   }

//   handleInputChange = e => {
//     this.setState({
//       ...this.state,
//       todo: e.target.value
//     });
//   }

//   render() {
//     return (
//     //   <NavBar>
//     //     <div className = 'todoForm'>
//     //       <form onSubmit={this.props.addTodo}>
//     //         <input
//     //           className ='inputbox'
//     //           onChange={this.handleInputChange}
//     //           placeholder="..add "
//     //           value={this.state.todo}
//     //           name="..to do"
//     //         /> 
//     //         <button className='button'>Add</button>
//     //       </form>
//     //     </div>
//     //   </NavBar>
//     // );

//       <div className = 'todoForm'>
//            <form onSubmit={this.props.addTodo}>
//            <input 
//                 type ='text'
//                 className ='inputbox'
//                  onChange={this.handleInputChange}
//                  placeholder="..add "
//                  value={this.state.todo}
//                  name="..to do"  
//           />
//           <button type= 'submit' className='button'>Add</button>
//           <div>
//               {this.props.todos.map((todoItem, index) => {
//                             return <div
//                                     style={{ textDecoration: todoItem.complete ? 'line-through' : 'none'}}
//                                     onClick={e => this.props.toggleItem(e, index)} key={index}>

//                                 {todoItem.todo}
                                
//                                 <button onClick={e => this.deleteItem(e, index)} key={index}>X</button>
//                             </div>
//                         })}
//                     </div>
//            </form>
//     </div>
//     );
//   }

// }

// export default TodoForm;
