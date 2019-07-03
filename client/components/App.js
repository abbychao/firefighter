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
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // TODO: Refactor to choose selected position
    fetch('/api/questions/get-first')
      .then((data) => data.json())
      .then((data) => this.setState({
        ...this.state,
        ...data,
        screen: 'q1',
      }))
      .catch(err => console.error(err));
    // this.setState({
    //   ...this.state,
    //   position: e.target.value,
    // });
  }


  componentDidMount() {
  }

  render() {
    const { position, fireType, screen, question, options } = this.state;
    console.log(this.handleClick);
    return (
      <div>
        <Nav position={position} fireType={fireType} />
        <Body screen={screen} question={question} options={options} handleClick={this.handleClick} />
      </div>
    );
  }
}

export default App;