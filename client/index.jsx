import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Items from './Items.jsx';
import LargePlayer from './LargePlayer.jsx';

class PhotoCarousel extends React.Component {
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
      url: '/api/media',
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

  rotateMedia(pic) {
    var array = this.state.mediaRoll
    this.setState({ largePlayer: array[pic].url, activeItem: pic })

    clearInterval(loopPictures)

    var loopPictures = setInterval(() => {
      if (this.state.largePlayer === array[array.length - 1].url) {
        this.setState({ largePlayer: array[2].url, activeItem: 1 })
      } else {
        this.setState({ largePlayer: array[this.state.activeItem + 1].url })
      }
      this.setState({ activeItem: this.state.activeItem + 1 })
    }, 4000)

    // console.log('loopPictures: ', loopPictures)
    // console.log('pic: ', pic)
  }


  render() {
    return (
      <div>
        <h1>Photo Carousel</h1>
        <LargePlayer largePlayer={this.state.largePlayer} />
        <Items mediaRoll={this.state.mediaRoll} activeItem={this.state.activeItem} handleClick={this.rotateMedia} />
      </div>
    )
  }
}

ReactDOM.render(<PhotoCarousel />, document.getElementById('photo-carousel'));