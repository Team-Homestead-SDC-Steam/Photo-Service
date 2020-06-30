import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

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
    $.ajax({
      method: 'GET',
      url: '/media/items',
      success: (data) => {
        console.log(data)
      },
      error: (err) => {
        console.log('error with ajax loadMedia: ', err)
      }
    })
  }

  render() {
    return (
      <h1>Test</h1>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));