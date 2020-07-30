import React from 'react'
import styled from 'styled-components'

const PictureFrame = styled.div`
#photo-carousel & {
  width: 100%;
  height: 336px;
  background: #ccc;
}
`

const LargePlayer = props => {
  return (
    <PictureFrame>
      <iframe src={props.largePlayer} style={{ width: '600px', height: '337px', display: 'flex', backgroundColor: '#1b2838' }} />
    </PictureFrame>
  )
}

export default LargePlayer