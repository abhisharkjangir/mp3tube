import React, {Component} from 'react'
import Truncate from 'react-truncate';
import moment from 'moment'


class Videocard extends Component {
  constructor() {
    super()
    this.state = {
      isLoading : false,
    };
    this.playVideo = this.playVideo.bind(this);
    this.fetchMp4Link = this.fetchMp4Link.bind(this);
    this.fetchMp3Link = this.fetchMp3Link.bind(this);
  }

   playVideo () {
    this.props.play(this.props.video)
  }

  componentWillMount () {
    // console.log(location);

  }

  fetchMp4Link () {
    this.setState({isLoading : true})
    let fuck = this;
    fetch(`http://imabhi.herokuapp.com/yt/kvidsite?id=${this.props.video.id}`)
    .then(r => r.json())
    .then(r => {
      // console.log(r.data.mp4);
      // location.href  = r.data.mp4;
      fuck.setState({isLoading : false, link: r.data.mp4});
    }).catch(err => {
      fuck.setState({isLoading : true});
    })
  }

  fetchMp3Link () {
    this.setState({isLoading : true})
    let fuck = this;
    fetch(`http://imabhi.herokuapp.com/yt/kvidsite?id=${this.props.video.id}`)
    .then(r => r.json())
    .then(r => {
      // location.href  = r.data.mp3;
      fuck.setState({isLoading : false, links: r.data});
    }).catch(err => {
      fuck.setState({isLoading : true});
    })
  }

  render(){
    return (
      <div className="video-card-container">
        <div className="video-card">
          <div className="video-thumbnail">
            <img src={this.props.video.snippet.thumbnails.default.url} className="img-responsive"/>
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
        </div>
        <div className="video-actions">
          <div className="row">
            <div className="col-xs-6">
              <p onClick={this.playVideo}>
                <i className="fa fa-play"></i> Play
              </p>
            </div>
            {/* <div className="col-xs-4">
              {!this.state.links && <p onClick={this.fetchMp3Link}>
                <i className="fa fa-download"></i> Mp3</p>}
                {this.state.links && <a className="download-ready" href={this.state.links.mp3} download> <i className="fa fa-check"></i> Mp3</a>}
            </div> */}
            <div className="col-xs-6" >
              {!this.state.link && <p onClick={this.fetchMp4Link}>
                <i className="fa fa-download"></i> Mp4</p>}
                {this.state.link && <a className="download-ready" href={this.state.link} download> <i className="fa fa-check"></i> Mp4</a>}
            </div>
          </div>
        </div>
        <p>{this.state.isLoading}</p>
        {this.state.isLoading && <div className="videocard-overlay">
          Preparing to download...<br/><br/>
          Thanks for your patience
        </div>}
      </div>
    )
  }
}


export default Videocard
