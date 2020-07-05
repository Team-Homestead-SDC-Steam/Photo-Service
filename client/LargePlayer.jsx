import React from "react";

const LargePlayer = props => {
  // console.log(props.largePlayer)
  return (
    <div style={{'width' : '610px' , 'height' : '337px', 'display': 'flex', 'backgroundColor': "#1b2838" }}>
      <iframe src={props.largePlayer} style={{'width' : '610px' , 'height' : '337px', 'display': 'flex', 'backgroundColor': "#1b2838" }}/>
    </div>
  )
}

export default LargePlayer;