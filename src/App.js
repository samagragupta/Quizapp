import React, { Component } from 'react';
import Quiz from './Components/quiz';
import './App.css';
import Start from './Components/Start';
import End from './Components/End';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'start',
      result: 0,
    }
    this.handler = this.handler.bind(this)
  }

  handler() {
    this.setState({
      status: 'quiz',
    })
  }

  endQuiz() {
    this.setState({
      status: 'end',
    })
  }

  getData = (data) => {
    this.setState({ status: data });
  }

  getResult = (data) => {
    this.setState({ result: data });
  }

  render() {

    switch (this.state.status) {
      case 'start':
        return (
          <Start handler={this.handler}></Start>
        )
        break;

      case 'quiz':
        return (
          <Quiz sendData={this.getData} sendResult={this.getResult}></Quiz>
        )
        break;

      case 'end':
        return (
          <End crctansw={this.state.result}></End>
        )
        break;
    }
  }
}

export default App;
