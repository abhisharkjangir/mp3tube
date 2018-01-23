import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Modal,Button} from 'react-bootstrap'
// import RP from 'request-promise';

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

    // https://r2---sn-p5qlsnz6.googlevideo.com/videoplayback?pl=14&ipbits=0&initcwndbps=2630000&mn=sn-p5qlsnz6&key=yt6&itag=251&mm=31&requiressl=yes&ei=dW5kWvq6KJHF1gLppYLQAg&sparams=clen%2Cdur%2Cei%2Cgir%2Cid%2Cinitcwndbps%2Cip%2Cipbits%2Citag%2Ckeepalive%2Clmt%2Cmime%2Cmm%2Cmn%2Cms%2Cmv%2Cpl%2Crequiressl%2Csource%2Cexpire&keepalive=yes&source=youtube&mv=m&mt=1516531241&ms=au&ip=18.216.37.148&clen=3888360&signature=5058FBB15BD697F62EB7A7AD0F3FF97B4F976620.8B2EB655317685341118ACC2FA4A14E86525E714&gir=yes&mime=audio%2Fwebm&dur=226.861&id=o-AA6SXUCs9q42BAcun0JyP80hdFq6hihiU26jcfL8hJgs&expire=1516552917&lmt=1515917046032205&ratebypass=yes
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
                  <li><a href={this.props.mp3.mp4} download><i className="fa fa-download"></i> Mp4 </a></li>
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
