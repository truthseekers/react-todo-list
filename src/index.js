import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class TodoApp extends React.Component{

  constructor(props){
    super(props);
    // Set initial state
    this.state = {
      items: ['Buy enchiladas', 'Buy Carrots', 'Buy Celery', 'add a form']

    };
  };

  //addTodo changes the state of the app. Adds items to the todo list.
  addTodo(todo){
    this.state.items.push(todo);
    this.setState({items: this.state.items});
  }

  // Notice how we pass in the addTodo function into the TodoForm component, and call addTodo from inside TodoForm.
  // The entire app is rendered from this component.
  render(){
    return (
      <div>
        <TodoForm addTodo={this.addTodo.bind(this)} />
        <TodoList todos={this.state.items} />
      </div>
    );
  }

}

class TodoForm extends Component {
  constructor(props){
    super(props);

    this.state = {value: ''};

    // Set the state of the input field every time the value is edited
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(event) {
    this.setState({value: event.target.value});
  }

  // onSubmission of the form, call 'addTodo' with the argument as the state of the input field.
  // After the form is submitted, reset the field, and prevent the forms default action.
  render(){
    // Render JSX
    return (
      <div>
        <form onSubmit={(event) => {
            this.props.addTodo(this.state.value);
            this.state.value = '';
            event.preventDefault();}}>
          <label>
            Todo:
            <input type="text" value={this.state.value} onChange={this.handleUpdate}/>
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}


class TodoList extends React.Component{

  constructor(props){
    super(props);
  }

  getListItems(){

    return (
      this.props.todos.map((item) => {
        return ( <Todo todo={item} /> );
      })
    );

  }

  render(){
    return (
      <div><ul>{this.getListItems()}</ul></div>
    );
  }
}


class Todo extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return <li>{this.props.todo}</li>;
  }
  
}

ReactDOM.render(<div>
                <App />
                <TodoApp />
                </div>, document.getElementById('root'));
registerServiceWorker();
