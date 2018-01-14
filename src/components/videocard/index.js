import React, {Component} from 'react'
import Truncate from 'react-truncate';
import moment from 'moment'


const Videocard = (props) => {
  const playVideo = () => {
    props.play(props.video)
  }
  return (
    <div>
      <div className="video-card">
        <div className="video-thumbnail">
          <img src={props.video.snippet.thumbnails.default.url} className="img-responsive"/>
        </div>
        <div className="video-description">
          <Truncate lines={2}>
            {props.video.snippet.title}
          </Truncate><br/>
          <b><Truncate lines={1}>
            {props.video.snippet.channelTitle}
          </Truncate></b>
          <p>Published on {moment(props.video.snippet.publishedAt).format('Do MMM YYYY')}</p>
        </div>
      </div>
      <div className="video-actions">
        <div className="row">
          <div className="col-xs-4">
            <p onClick={playVideo}>
              <i className="fa fa-play"></i> Play
            </p>
          </div>
          <div className="col-xs-4">
            <p>
              <i className="fa fa-download"></i> Mp3</p>
          </div>
          <div className="col-xs-4">
            <p>
              <i className="fa fa-download"></i> Mp4</p>
          </div>
        </div>
      </div>
    </div>
)}

export default Videocard
