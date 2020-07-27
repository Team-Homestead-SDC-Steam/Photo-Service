import React from "react";
import styled from 'styled-components'

const Item = styled.div`
  position: relative;
  background-size: contain;
  float: left;

  iframe, img {
    height: 65px;
    width: 115px;
    border: none;
    background-image: linear-gradient(135deg,  #3d6c8d 0%,#2e5470 100%);
  }

  ${props => props.active && `
    border: 3px solid white;
    &:after {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 50%;
      margin-left: -8px;
      width: 0;
      height: 0;
      border-bottom: 8px solid #fff;
      border-right: 8px solid transparent;
      border-left: 8px solid transparent;
    }
  `}
`

const Items = props => {
  return (
    <div className="customScrollbar" style={{ 'display': 'flex', 'flexDirection': 'row', 'backgroundColor': "#1b2838", 'paddingTop': '5px', 'overflow': 'auto', 'width': '608px' }}>
      {props.mediaRoll.map((img, index) => {
        if (img.mediaType === 'video') {
          return (
            <div >
            <Item key={index} active={props.activeItem === index} onClick={() => {props.handleClick(index)}}>
              <img src={img.thumbnail} key={index} />
            </Item>
            </div>
          )
        }
        return (
          <Item key={index} active={props.activeItem === index} onClick={() => {props.handleClick(index)}}>
            <img src={img.url} key={index}  />
          </Item>
        )
      })}
    </div>
  )
}

export default Items;