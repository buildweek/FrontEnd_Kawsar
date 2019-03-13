import React, { Component } from "react";
import axios from "axios";
import styled from "styled-components";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      dueDate: "",
      description: "",
      show: "all",
      completed: false,
      userId: ""
    };
  }

  addTodo = event => {
    console.log("click");
    // var token = localStorage.getItem(`token`)
    // var request = {
    //   headers: { authorization : token }
    // }
    axios
      .post("https://buildweek-wunderlist.herokuapp.com/api/lists", this.state)
      .then(res => {
        console.log("addtodo");
        console.log(res);
        this.setState({ id: res.id });
        this.props.history.push("/lists");
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({
      title: "",
      dueDate: "",
      description: ""
    });
  };

  handleInputChange = e => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  };
  toggleShow = tab => {
    this.setState({ show: tab });
  };
  render() {
    return (
      <BorderBar>
        <form onSubmit={this.addTodo}>
          <div className="input-form">
            <input
              type="text"
              className="inputbox"
              onChange={this.handleInputChange}
              placeholder="Task "
              value={this.state.title}
              name="title"
            />
            <input
              type="date"
              className="inputbox"
              onChange={this.handleInputChange}
              placeholder="Due Date"
              value={this.state.dueDate}
              name="dueDate"
            />
            <input
              type="text"
              className="inputbox"
              onChange={this.handleInputChange}
              placeholder="Description "
              value={this.state.description}
              name="description"
            />
            <button type="submit" className="add-button">
              Add
            </button>
          </div>
        </form>
        <div>
          <div className="task-lists">
            {this.state.show === "all"
              ? this.props.todos.map((todoItem, index) => {
                  return (
                    <div
                      className="perList"
                      style={{
                        textDecoration: todoItem.complete
                          ? "line-through"
                          : "none"
                      }}
                      onClick={e => this.props.toggleCompleted(e, index)}
                      key={index}
                    >
                      <div>
                        <h3>{todoItem.title} </h3>
                        <p>{todoItem.description}</p>
                        <p>{todoItem.dueDate}</p>
                      </div>

                      <button
                        onClick={() => this.props.deleteTodo(this.props.id)}
                        className="cross"
                      >
                        {" "}
                        clear
                      </button>
                    </div>
                  );
                })
              : this.props.todos
                  .filter(todo => todo.complete === this.state.show)
                  .map((todoItem, index) => {
                    return (
                      <div className="perList">
                        <div>
                          <h3>{todoItem.title} </h3>
                          <p>{todoItem.description}</p>
                          <p>{todoItem.dueDate}</p>
                        </div>
                        <button
                          onClick={() => this.props.deleteTodo(this.props.id)}
                          className="cross"
                        >
                          clear
                        </button>
                      </div>
                    );
                  })}
          </div>
          <div className="todo-tabs">
            <h3
              onClick={() => this.toggleShow("all")}
              className={this.state.show === "all" ? "selected" : null}
            >
              All
            </h3>
            <h3
              onClick={() => this.toggleShow(true)}
              className={this.state.show === true ? "selected" : null}
            >
              Completed
            </h3>
            <h3
              onClick={() => this.toggleShow(false)}
              className={this.state.show === false ? "selected" : null}
            >
              Unfinished
            </h3>
          </div>

          <button className="clear-button" onClick={this.props.clearCompleted}>
            {" "}
            Clear Completed{" "}
          </button>
        </div>
      </BorderBar>
    );
  }
}

export default TodoList;
const BorderBar = styled.div`
  min-height: 400px;
  margin: 1%;

  .input-form {
    display: flex;
    flex-wrap: wrap;
    width: 93%;
    margin: 1%;
    padding: 3%;
    border-radius: 6px;
    background: rgb(243, 239, 239);
    .inputbox {
      width: 90%;
      margin: 0.4%;
      padding: 0.5rem;
      @media (min-width: 800px) {
        width: 200px;
        margin: auto;
      }
    }
    @media (min-width: 800px) {
      width: 800px;
      margin: auto;
    }
  }
  button {
    cursor: pointer;
    display: flex;
    margin: 5px auto;
    border: 1px solid #000;
    text-align: center;
    border-radius: 6px;
    color: #6195ed;
    background: rgb(213, 236, 243);
    font-weight: bold;
  }
  button:hover {
    background: #6195ed;
    color: white;
  }
  .task-lists {
    display: flex;
    flex-wrap: wrap;
    width: 400px;
    margin: 1% auto;
    @media (min-width: 800px) {
      width: 800px;
    }
    .perList {
      flex-wrap: wrap;
      padding: 2px;
      margin: 0.5% auto;
      background: rgb(101, 236, 243);
      border-radius: 10px;
      width: 100%;
      content-align: left;
      @media (min-width: 800px) {
        width: 48%;
      }
    }
  }
  .todo-tabs {
    width: 60%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    background: rgb(213, 236, 243);
    border-radius: 6px;
    @media (min-width: 800px) {
      width: 300px;
      margin: auto;
    }
  }
  .todo-tabs h3 {
    cursor: pointer;
    width: 30%;
    font-size: 13px;
    font-weight: normal;
    text-align: center;
    background-color: rgb(213, 236, 243);
    transition: box-shadow 0.2s, background-color 0.2s;
  }

  .cross {
    border: 1px solid #000;
    width: 50px;
    border-radius: 5px;
    font-weight: bold;
    text-align: center;
    font-size: 12px;
    background-color: rgb(213, 236, 243);
  }
  .completed {
    background-color: blue;
    height: 20px;
  }

  .completed div:not(.cross) {
    text-decoration: line-through;
    opacity: 0.4;
  }

  .todo-tabs .selected {
    background-color: #6195ed;
    box-shadow: inset 3px 3px 5px rgb(0, 0, 0, 0.25);
    height: 20px;
    color: white;
    border-radius: 5px;
  }
`;
