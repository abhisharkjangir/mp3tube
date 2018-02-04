import React, {Component} from 'react'
import Truncate from 'react-truncate';
import moment from 'moment'
import {ButtonToolbar, DropdownButton, MenuItem} from 'react-bootstrap';

class Videocard extends Component {
  constructor() {
    super()
    this.state = {
      isLoading : false ,modalOpen : false
    };
    this.playVideo = this.playVideo.bind(this);
    this.fetchMp4Link = this.fetchMp4Link.bind(this);
}
   playVideo () {
    this.props.play(`https://www.youtube.com/watch?v=${this.props.video.id}`)
  }

  componentWillMount () {
    if(this.props.video.snippet.thumbnails) {

    } else {
      this.setState({dontrender : true})
    }
  }


  fetchMp4Link () {
    this.setState({isLoading : true})
    let fuck = this;
    fetch(`http://api.imabhi.in?vid_url=https://www.youtube.com/watch?v=${this.props.video.id}`)
    .then(r => r.json())
    .then(r => {
      r = r.filter((v) => v.resolution.split('x')[1] == '720')
      fuck.setState({isLoading : false, link:r[0]});
      console.log(fuck.state.link);
    }).catch(err => {
      console.log(err);
      fuck.setState({isLoading : false});
    })
  }


  render(){
    return (
      <div className="video-card-container">
        {!this.state.dontrender && <div className="video-card">
          <div className="video-thumbnail">
            <img src={this.props.video.snippet.thumbnails.high.url} className="img-responsive"/>
          </div>
          <div className="video-description">
            <Truncate lines={2}>
              {this.props.video.snippet.title}
            </Truncate><br/>
            <b><Truncate lines={1}>
              {this.props.video.snippet.channelTitle}
            </Truncate></b>
            <p>Published on {moment(this.props.video.snippet.publishedAt).format('Do MMM YYYY')}</p>
          </div>
        </div>}
        {!this.state.dontrender && <div className="video-actions">
          <div className="row">
            <div className="col-xs-6 text-left">
              <p onClick={this.playVideo}>
                <i className="fa fa-play"></i> Play
              </p>
            </div>
            {/* <div className="col-xs-4">
              {this.state.link && <a className="download-ready" href={`${this.state.link.mp3}&title=${this.props.video.snippet.title}`} download> <i className="fa fa-check"></i> Mp3</a>}
            </div> */}
            <div className="col-xs-6 text-right" >
              {!this.state.link && <p onClick={this.fetchMp4Link}> <i className="fa fa-download"></i> Download</p>}
              {this.state.link && <a className="download-ready" href={`${this.state.link.file_url}&title=${this.props.video.snippet.title}`} download> <i className="fa fa-download"></i> 720p [{Math.ceil(this.state.link.file_size/(1024*1024))} mb]</a>
              }
            </div>
          </div>
        </div>}
        {!this.state.dontrender && this.state.isLoading && <Preparing />}
      </div>
    )
  }
}

// const Downloadview = (props) => (
//   <div className="videocard-download">
//     {props.list.map(link => <a  href={`${link.file_url}&title=${props.title}`} download><i className="fa fa-download"></i>  {link.resolution.split('x')[1]}p [{Math.ceil(link.file_size/(1024*1024))} mb]</a>)}
//     <a ><i className="fa fa-play"></i> Play</a>
//     <a ><i className="fa fa-close"></i> Close</a>
//   </div>
// )

const Preparing = ( ) => (
  <div className="videocard-overlay">
    <span>Preparing...<br/><br/>
    Thanks for your patience :)</span>
  </div>
)


export default Videocard
