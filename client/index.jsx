import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      largePlayer: null,
      mediaRoll: []
    }

  }
  componentDidMount() {
    this.loadMedia()
  }

  loadMedia () {
    console.log('test is working')
  }

  render() {
    return (
      <h1>Test</h1>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));