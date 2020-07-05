import React from "react";

const Items = props => {
  return (
    <div class='thumbnailrow' style={{'display': 'flex' , 'flexDirection': 'row' , 'backgroundColor': "#1b2838" , 'paddingTop' : '5px', 'overflow' : 'auto' , 'width' : '608px'}}>
      {props.mediaRoll.map((img, key) => {
        if (img.mediaType === 'video') {
          return (
            <div onClick={() => (console.log(img.url))} style={{'backgroundSize' : 'contain', 'float' : 'left'}} >
              <iframe src={img.url} key={key++} style={{'postion' : 'absolute', 'height' : '65px' , 'width' : '115px', 'paddingTop' : '5px'}}/>
            </div>
          )
        }
        return (
          <div style={{'backgroundSize' : 'contain', 'float' : 'left'}} >
            <img src={img.url} key={key++} style={{'height' : '65px' , 'width' : '115px' , 'paddingTop' : '5px'}}/>
          </div>
        )
      })}
    </div>
  )
}

export default Items;