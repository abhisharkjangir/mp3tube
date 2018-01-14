import React, {Component} from 'react'
import ReactPlayer from 'react-player'

const Videoplayer = (props) => (
  <div className="video-player-container text-right" draggable="true">
    <i className="fa fa-close" onClick={props.closeVideo}> Close</i>
    <ReactPlayer className="video-player" url={props.url} playing controls/>
  </div>
)

export default Videoplayer;
