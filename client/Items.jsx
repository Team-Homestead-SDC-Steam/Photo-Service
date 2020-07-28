import React, { useState} from 'react'
import styled from 'styled-components'
import Draggable from 'react-draggable'

const Items = props => {
  const [state, setstate] = useState(0)

  const handleDrag = res => {
    setstate(capturePositionGrid(res.x))
  }

  const increment = num => {
    const max = props.mediaRoll.length
    const min = 0
    let newNum = props.activeItem + num
    newNum = newNum >= max ? 0 : newNum
    newNum = newNum < min ? max - 1 : newNum
    setstate(newNum)
    props.handleClick(newNum)
  }
  const capturePositionGrid = position => {
    position = position > 500 ? 500 : position
    position = position < 0 ? 0 : position
    const max = props.mediaRoll.length
    const grid = 510 / max
    let cursor = Math.floor(position / grid)
    return cursor
  }
  return (
    <React.Fragment>
      <ThumbFrame imagecount={props.mediaRoll.length} scrollPosition={state}>
        {props.mediaRoll.map((img, index) => {
          return (
            <div key={index}  className={`img ${props.activeItem === index && 'active'}`}>
              {img.mediaType === 'video' ? (
                <img src={img.thumbnail} key={index} onClick={() => {props.handleClick(index)}}/>
              ) : (
                <img src={img.url} key={index} onClick={() => {props.handleClick(index)}} />
              )}
            </div>
          )
        })}
      </ThumbFrame>
      <ControlFrame
        imagecount={props.mediaRoll && props.mediaRoll.length}
        scrollPosition={state}>
        <div onClick={() => increment(-1)}>{'<'}</div>
        <div className='scrollbar'>
          <Draggable
            axis='x'
            handle='.handle'
            bounds='parent'
            defaultPosition={{ x: 0, y: 0 }}
            position={{ x: (state * 510) / props.mediaRoll.length, y: 0 }}
            grid={[510 / props.mediaRoll.length, 510 / props.mediaRoll.length]}
            scale={1}
            onDrag={handleDrag}>
            <div className='handle' />
          </Draggable>
        </div>
        <div onClick={() => increment(+1)}>{'>'}</div>
      </ControlFrame>
    </React.Fragment>
  )
}

const ThumbFrame = styled.div`
  width: ${props => props.imagecount * 146}px;
  margin-left: -${props => props.scrollPosition * 146 >= 500 ?  500 : props.scrollPosition * 146  }px;
  transition: 0.3s ease-out;
  background-color: #1b2838;
  height: 80px;
  box-sizing:content-box;
  display:flex;

  & .img {
    display: block;
    width: 146px;
    height: 80px;
    margin: 2px;
    position: relative;
    & img, & iframe {
      width: 100%;
      height: 100%;
    }


     &.active {
      border: 3px solid #fff;
      margin: 0;
      &:after {
        content: '';
        display: block;
        position: absolute;
        top: -8px;
        left: calc(50% - 4px);
        height: 0;
        width: 0;
        border-bottom: 8px solid #fff;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
      }
    }
  }
`
const ControlFrame = styled.div`
  display: grid;
  grid-template-columns: 40px auto 40px;
  grid-gap: 5px;
  background: #eee;
  height: 30px;
  background-color: rgb(26,43,56);

  & > div {
    margin-top:10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    outline none;
    background-color: rgba(255,255,255, 0.2);
    &:hover {
      background-color: rgba(255,255,255, 0.5);
      color:black;
    }
  }
  & .scrollbar {
    margin-top:10px;
    position: relative;
    background: rgba(0, 0, 0, 0.2)!important;
    overflow: hidden;
    & .handle {
      background: rgba(0,0,0,0.5);
      display: block;
      border-radius: 3px;
      height: 100%;
      width: ${props => 100 / props.imagecount}%;
      position: absolute;
      transition: 0.3s ease-out;
      top: 0;
      left: 0;
    }
  }
`


export default Items;
