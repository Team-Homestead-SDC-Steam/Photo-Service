import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Items from './Items.jsx';
import LargePlayer from './LargePlayer.jsx';

class PhotoCarousel extends React.Component {
  constructor(props) {
    super(props);
    const regex = /app\/(\d+)/;
    const idRegEx = window.location.href.match(regex)
    const id = (idRegEx && idRegEx.length == 2) ? idRegEx[1] : Math.floor(Math.random() * 99)
    this.state = {
      largePlayer: null,
      mediaRoll: [],
      activeItem: 0,
      // Note: this below only works when running through the proxy server. Just make it a random number in order to test out just the service on port 3004
      gameId: id
    }
    this.interval = null;
    this.rotateMedia = this.rotateMedia.bind(this)
  }
  componentDidMount() {
    console.log('gameId: ', this.state.gameId)
    this.loadMedia(this.state.gameId)
  }

  loadMedia(gameId) {
    $.ajax({
      method: 'GET',
      url: `/api/media/${gameId}`,
      success: (data) => {
        console.log('gameId from ajax: ', gameId)
        console.log('data from ajax: ', data)
        this.setState({
          largePlayer: data[0].url,
          mediaRoll: data
        })
        // this.rotateMedia()
      },
      error: (err) => {
        console.log('error with ajax loadMedia: ', err)
      }
    })
  }

  rotateMedia(pic) {
    var array = this.state.mediaRoll
    this.setState({ largePlayer: array[pic].url, activeItem: pic })

    clearInterval(this.interval)

    this.interval = setInterval(() => {
      if (this.state.largePlayer === array[array.length - 1].url) {
        this.setState({ largePlayer: array[2].url, activeItem: 1 })
      } else {
        this.setState({ largePlayer: array[this.state.activeItem + 1].url })
      }
      this.setState({ activeItem: this.state.activeItem + 1 })
    }, 4000)
  }


  render() {
    return (
      <div>
        <LargePlayer largePlayer={this.state.largePlayer} />
        <Items mediaRoll={this.state.mediaRoll} activeItem={this.state.activeItem} handleClick={this.rotateMedia} />
      </div>
    )
  }
}

ReactDOM.render(<PhotoCarousel />, document.getElementById('photo-carousel'));