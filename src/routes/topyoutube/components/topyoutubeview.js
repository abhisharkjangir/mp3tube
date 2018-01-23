import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Videocard from '../../../components/videocard'
import Videoplayer from '../../../components/videoplayer/videoplayer'
import Loader from '../../../components/loader'

class Topyoutube extends Component {
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

  playVideo(url){
    this.setState({
      isVideoPlaying : true,
      playingVideoID : url
    })
  }
  closeVideo(){
    this.setState({
      isVideoPlaying : false,
      playingVideoID : undefined
    })
  }


  render() {
    return (
    <div className="trending">
      { this.state.isVideoPlaying && <Videoplayer url={this.state.playingVideoID} closeVideo={this.closeVideo} loop/>}
      <div className="heading m-b-10">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-6 p-0"><p> Trending  Videos  </p></div>
            {/* <div className="col-xs-6 p-0 text-right"><a className="" href="">View all</a></div> */}
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 ">
            {this.state.isLoading && <Loader />}

              {this.state.list.map(video => <Videocard key={video.id} video={video} play={this.playVideo}/>)}
          </div>
        </div>
      </div>
    </div>    )
  }
}

Topyoutube.propTypes = {

}

export default Topyoutube
