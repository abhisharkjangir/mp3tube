import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Truncate from 'react-truncate';
import moment from 'moment'
import Videocard from '../../../components/videocard'
import Videoplayer from '../../../components/videoplayer/videoplayer'
import Loader from '../../../components/loader'


class Trending extends Component {
  constructor() {
    super()
    this.state = {
      list : [],isVideoPlaying : false
    };
    this.playVideo = this.playVideo.bind(this);
    this.closeVideo = this.closeVideo.bind(this);
  }

  componentWillMount(){
    this.setState({isLoading : true})
    fetch('https://mp3tube1.herokuapp.com/youtube/trending')
    .then(r => r.json())
    .then(r => {
      this.setState({list : r.items, isLoading : false});
    });
  }

  playVideo(video){
    this.setState({
      isVideoPlaying : true,
      playingVideoID : video.id
    })
  }
  closeVideo(){
    this.setState({
      isVideoPlaying : false,
      playingVideoID : undefined
    })
  }

  render() {
    return (<div className="trending">
      { this.state.isVideoPlaying && <Videoplayer url={`https://www.youtube.com/watch?v=${this.state.playingVideoID}`} closeVideo={this.closeVideo} />}
      <div className="heading">
        <p> Trending Videos </p>
      </div>
      {this.state.isLoading && <Loader />}
      <div className="video-listing">
        {this.state.list.length > 0 && this.state.list.map(video =>
          <Videocard video={video} key={video.id}  play={this.playVideo}/>
        )}
      </div>
    </div>)
  }
}

Trending.propTypes = {

}

export default Trending
