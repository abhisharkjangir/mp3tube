import React, {Component} from 'react'
import Truncate from 'react-truncate';
import moment from 'moment'

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
      console.log('dont render');
      this.setState({dontrender : true})
    }
  }


  fetchMp4Link () {
    this.setState({isLoading : true})
    let fuck = this;
    fetch(`http://api.imabhi.in?vid_url=https://www.youtube.com/watch?v=${this.props.video.id}`)
    .then(r => r.json())
    .then(r => {
      fuck.setState({isLoading : false, links:{ mp4 : r[4].file_url , mp3 : r[5].file_url}});
      // console.log(this.state.links);
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
            <div className="col-xs-4">
              <p onClick={this.playVideo}>
                <i className="fa fa-play"></i> Play
              </p>
            </div>
            <div className="col-xs-4">
              {this.state.links && <a className="download-ready" href={this.state.links.mp3} download> <i className="fa fa-check"></i> Mp3</a>}
            </div>
            <div className="col-xs-4" >
              {!this.state.links && <p onClick={this.fetchMp4Link}> <i className="fa fa-download"></i> Download</p>}
              {this.state.links && <a className="download-ready" href={this.state.links.mp4} download> <i className="fa fa-check"></i> Mp4</a>}
            </div>
          </div>
        </div>}
        {!this.state.dontrender && <p>{this.state.isLoading}</p>}
        {!this.state.dontrender && this.state.isLoading && <div className="videocard-overlay">
          Preparing...<br/><br/>
          Thanks for your patience :)
        </div>}
      </div>
    )
  }
}


export default Videocard
