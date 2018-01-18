import React, {Component} from 'react'
import Truncate from 'react-truncate';
import moment from 'moment'
import Mp3Modal from '../../components/mp3/mp3modal'

class Videocard extends Component {
  constructor() {
    super()
    this.state = {
      isLoading : false,modalOpen : false
    };
    this.playVideo = this.playVideo.bind(this);
    this.fetchMp4Link = this.fetchMp4Link.bind(this);
    this.fetchMp3Link = this.fetchMp3Link.bind(this);
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
            <div className="col-xs-4">
              <p onClick={this.playVideo}>
                <i className="fa fa-play"></i> Play
              </p>
            </div>
            <div className="col-xs-4">
              <p onClick={this.openMp3Modal}>
                <i className="fa fa-download"></i> Mp3</p>
                {this.state.modalOpen && <Mp3Modal
                  id={this.props.video.id}
                  open={this.state.modalOpen}
                  close={this.closeMp3Modal}
                  yes={this.clearWords}
                  no={this.closeMp3Modal}
                  title="Please wait..."
                  body="It will take a few seconds to load :)"
                  yesBtnLabel="Yes"
                  noBtnLabel="No"
                />}
            </div>
            <div className="col-xs-4" >
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
