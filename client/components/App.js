import React, { Component } from 'react';
import Question from './Question'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQ: null
    };
  }

  render() {
    return (
      <div>
        <h1>Hello App</h1>
        <Question />
        <button>Click Me</button>
      </div>
    );
  }
}

export default App;