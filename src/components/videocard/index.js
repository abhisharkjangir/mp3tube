import React, {Component} from 'react'
import Truncate from 'react-truncate';
import moment from 'moment'
import Mp3Modal from '../../components/mp3/mp3modal'

class Videocard extends Component {
  constructor() {
    super()
    this.state = {
      isLoading : false ,modalOpen : false
    };
    this.playVideo = this.playVideo.bind(this);
    this.fetchMp4Link = this.fetchMp4Link.bind(this);
    this.openMp3Modal = this.openMp3Modal.bind(this)
    this.closeMp3Modal = this.closeMp3Modal.bind(this)
  }

   playVideo () {
    this.props.play(this.props.video)
  }

  componentWillMount () {
    // console.log(location);

  }

  openMp3Modal(){
    this.setState({modalOpen : true})
  }

  closeMp3Modal(){
    this.setState({modalOpen : false})
  }

  fetchMp4Link () {
    this.setState({isLoading : true})
    let fuck = this;
    fetch(`http://api.imabhi.in?vid_url=https://www.youtube.com/watch?v=${this.props.video.id}`)
    .then(r => r.json())
    .then(r => {
      fuck.setState({isLoading : false, links:{ mp4 : r[4].file_url , mp3 : r[5].file_url}});
    }).catch(err => {
      console.log('error');
      fuck.setState({isLoading : false});
    })
  }

  // fetchMp3Link () {
  //   this.setState({isLoading : true})
  //   let fuck = this;
  //   fetch(`http://api.imabhi.in?vid_url=https://www.youtube.com/watch?v=${this.props.video.id}`)
  //   .then(r => r.json())
  //   .then(r => {
  //     fuck.setState({isLoading : false, link: { mp3: r[5].file_url}});
  //   }).catch(err => {
  //     fuck.setState({isLoading : true});
  //   })
  // }

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
            <div className="col-xs-4">
              <p onClick={this.playVideo}>
                <i className="fa fa-play"></i> Play
              </p>
            </div>
            <div className="col-xs-4">
              {this.state.links && <a className="download-ready" href={this.state.links.mp3} download={this.props.video.snippet.title + 'mp3'}> <i className="fa fa-check"></i> Mp3</a>}
            </div>
            <div className="col-xs-4" >
              {!this.state.links && <p onClick={this.fetchMp4Link}> <i className="fa fa-download"></i> Download</p>}
              {this.state.links && <a className="download-ready" href={this.state.links.mp4} download={this.props.video.snippet.title + '.mp4'}> <i className="fa fa-check"></i> Mp4</a>}
            </div>
          </div>
        </div>
        <p>{this.state.isLoading}</p>
        {this.state.isLoading && <div className="videocard-overlay">
          Preparing...<br/><br/>
          Thanks for your patience :)
        </div>}
      </div>
    )
  }
}


export default Videocard
