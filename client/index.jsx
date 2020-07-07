import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Items from './Items.jsx';
import LargePlayer from './LargePlayer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      largePlayer: null,
      mediaRoll: [],
      activeItem: 0
    }
    this.rotateMedia = this.rotateMedia.bind(this)
  }
  componentDidMount() {
    this.loadMedia()
  }

  loadMedia() {
    $.ajax({
      method: 'GET',
      url: '/media/items',
      success: (data) => {
        this.setState({
          largePlayer: JSON.parse(data)[0].url,
          mediaRoll: JSON.parse(data)
        })
        // this.rotateMedia()
      },
      error: (err) => {
        console.log('error with ajax loadMedia: ', err)
      }
    })
  }

  rotateMedia() {
    var array = this.state.mediaRoll
    setInterval(() => {
      if (this.state.largePlayer === array[array.length - 1].url) {
        this.setState({ largePlayer: array[2].url })
        this.setState({ activeItem: 1 })
      } else {
        this.setState({ largePlayer: array[this.state.activeItem + 1].url })
      }
      this.setState({ activeItem: this.state.activeItem + 1 })
    }, 4000)
  }



  render() {
    return (
      <div>
        <h1 onClick={() => {this.rotateMedia()}}>Photo Carousel</h1>
        <LargePlayer largePlayer={this.state.largePlayer} />
        <Items mediaRoll={this.state.mediaRoll} activeItem={this.state.activeItem} handleClick={this.rotateMedia}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));