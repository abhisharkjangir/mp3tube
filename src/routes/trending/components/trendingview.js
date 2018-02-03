import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Truncate from 'react-truncate';
import moment from 'moment'
import Videocard from '../../../components/videocard'
import Videoplayer from '../../../components/videoplayer/videoplayer'
import Loader from '../../../components/loader'
import Slider from 'react-slick'
import Mp3card from '../../../components/mp3'

class Trending extends Component {
  constructor() {
    super()
    this.state = {
      list : [],isVideoPlaying : false, punjabi : [], isPunjabiLoading : false
    };
    this.playVideo = this.playVideo.bind(this);
    this.closeVideo = this.closeVideo.bind(this);
  }

  componentWillMount(){

    this.setState({isLoading : true, isPunjabiLoading : true})
    fetch('https://mp3tube1.herokuapp.com/youtube/trending')
    .then(r => r.json())
    .then(r => {
      this.setState({list : r.items.slice(0,5), isLoading : false});
    });

    fetch('http://imabhi.herokuapp.com/yt/tp')
    .then(r => r.json())
    .then(r => {
      if (r.success){
        this.setState({punjabi : r.data.slice(0,5), isPunjabiLoading : false});
      }
    })
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
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay : false,
      arrows : false
    };
    var list = [1,2,3,4,5,6]
    return (<div className="trending">
      { this.state.isVideoPlaying && <Videoplayer url={this.state.playingVideoID} closeVideo={this.closeVideo} loop/>}
      <div className="heading">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-6 p-0"><p> Trending Videos  </p></div>
            <div className="col-xs-6 p-0 text-right"><a className="" href="#/topyoutube">View all</a></div>
          </div>
        </div>
      </div>
      {this.state.isLoading && <Loader />}
      <Slider {...settings}>
        {this.state.list.map(video => <div key={video.id} className="slick-card"><Videocard video={video}   play={this.playVideo}/></div>)}
      </Slider>
      <div className="heading">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-6 p-0"><p> Top Punjabi </p></div>
            <div className="col-xs-6 p-0 text-right"><a className="" href="#/toppunjabi">View all</a></div>
          </div>
        </div>
      </div>
      {this.state.isPunjabiLoading && <Loader />}
        {this.state.punjabi.map((mp3,i) => <Mp3card key={mp3.info.track} mp3={mp3.info} play={this.playVideo} />)}

    </div>)
  }
}

Trending.propTypes = {

}

export default Trending
