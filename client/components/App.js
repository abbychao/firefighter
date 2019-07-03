import React, { Component } from 'react';
import Body from "./Body.js";
import Nav from "./Nav.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'welcome',
      position: null,
      buildingType: null,
      currentQuestion: null,
    };
  }

  componentDidMount() {
    fetch('/api/questions/get-first')
      .then((data) => data.json())
      .then((data) => this.setState({ ...this.state, ...data }))
      .catch(err => console.error(err));
  }

  render() {
    const { position, fireType, screen, question, options } = this.state;
    return (
      <div>
        <Nav position={position} fireType={fireType} />
        <Body screen={screen} question={question} options={options} />
      </div>
    );
  }
}

export default App;