import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Modal,Button} from 'react-bootstrap'

class Mp3card extends Component{
  constructor(){
    super()
    this.state = {

    }
    this.playVideo = this.playVideo.bind(this);
  }

  playVideo () {
   this.props.play(this.props.mp3.mp3.kbps48)
  }

  componentWillMount(){

  }

  render(){
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="mp3-card">
              <div className="mp3-info">
                <div className="mp3-thumb">
                  <img src={this.props.mp3.thumb} width="50px"/>
                </div>
                <div className="mp3-detail">
                  <p className="track"><b>{this.props.mp3.track}</b></p>
                  <p>{this.props.mp3.artist}</p>
                </div>
              </div>
              <div className="mp3-actions">
                <ul>
                  {/* <li><a href={this.props.mp3.mp4} download><i className="fa fa-download"></i> Mp4 </a></li> */}
                  <li><a href={this.props.mp3.mp3.kbps48.url} download><i className="fa fa-download"></i> {this.props.mp3.mp3.kbps48.size} </a></li>
                  <li><a href={this.props.mp3.mp3.kbps128.url} download><i className="fa fa-download"></i> {this.props.mp3.mp3.kbps128.size}</a></li>
                  <li><a href={this.props.mp3.mp3.kbps320.url} download><i className="fa fa-download"></i> {this.props.mp3.mp3.kbps320.size}</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Mp3card
