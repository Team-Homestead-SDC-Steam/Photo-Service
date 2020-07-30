import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Items from './Items.jsx';
import LargePlayer from './LargePlayer.jsx';
import styled from 'styled-components'

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
      gameId: id
    }
    this.interval = null;
    this.rotateMedia = this.rotateMedia.bind(this)
  }
  componentDidMount() {
    this.loadMedia(this.state.gameId)
  }

  loadMedia(gameId) {
    $.ajax({
      method: 'GET',
      url: `/api/media/${gameId}`,
      success: (data) => {
        this.setState({
          largePlayer: data[0].url,
          mediaRoll: data
        })
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

    if (pic > 1) {
      this.interval = setInterval(() => {
        if (this.state.largePlayer === array[array.length - 1].url) {
          this.setState({ largePlayer: array[2].url, activeItem: 1 })
        } else {
          this.setState({ largePlayer: array[this.state.activeItem + 1].url })
        }
        this.setState({ activeItem: this.state.activeItem + 1 })
      }, 4000)
    }
  }


  render() {
    return (
      <Wrapper>
      <LargePlayer largePlayer={this.state.largePlayer} />
      <Items mediaRoll={this.state.mediaRoll} activeItem={this.state.activeItem} handleClick={this.rotateMedia} />
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
    width: 600px;
    background-color: #1b2838;
    min-height: 300px;
    overflow: hidden;
    &*{
        box-sizing: border-box;
    }
`;

ReactDOM.render(<PhotoCarousel />, document.getElementById('photo-carousel'));