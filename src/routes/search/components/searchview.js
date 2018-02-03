import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Videocard from '../../../components/videocard'
import Videoplayer from '../../../components/videoplayer/videoplayer'
import Loader from '../../../components/loader'
import { hashHistory, Router } from 'react-router'

const debounce = (func, delay) => {
  let inDebounce = undefined;
  return function() {
    let context = this,
      args = arguments;
    clearTimeout(inDebounce);
    return inDebounce = setTimeout(function() {
      return func.apply(context, args);
    }, delay);
  }
};

class Search extends Component {
  constructor() {
    super()
    this.state = {
      q : '',list : [], isVideoPlaying :false, isSearching : undefined
    };

    this.debounceSearch = this.debounceSearch.bind(this);
    this.fetchVideos = this.fetchVideos.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.closeVideo = this.closeVideo.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentWillMount(){
    this.handleSearchDebounced = debounce(this.fetchVideos, 500);
    if (this.props.location.query.q && this.props.location.query.q.length > 0) {
      this.setState({q : this.props.location.query.q})
      this.handleSearchDebounced()
    }
  }

  fetchVideos(){
    this.setState({list : []})
    if (this.state.q == '' || !this.state.q) {
      return
    }
    this.setState({isSearching : true})
    fetch(`https://mp3tube1.herokuapp.com/youtube/search?q=${this.state.q}`)
    .then(r => r.json())
    .then(r => {
      if(r.length > 0) {
        let nl =  r.map(v => {
           v.snippet = v;
           return v;
         })
         nl = nl.filter(v => {
            return v.kind.split('#')[1] == 'video'
         })
         this.setState({list : nl});
      }
      this.setState({isSearching : false});
    });
  }

  debounceSearch(e){
    let q = e.target.value;
    hashHistory.push(`search?q=${q}`)
    this.setState({q : q})
    this.handleSearchDebounced()
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

  clearSearch(){
    this.setState({q :'', list : [],isVideoPlaying : false,
    playingVideoID : undefined});
    hashHistory.push(`search`)
  }

  render() {
    return (
      <div className="search">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 p-0">
              <div className="input-group search-bar">
                <input type="text" className="form-control" value={this.state.q} placeholder="Search video by name" onChange={this.debounceSearch}/>
                 <span className="input-group-btn">
                  <button className="btn btn-default search-btn" type="button" onClick={this.state.q? this.clearSearch : ''}> <i className={this.state.q ? 'fa fa-close' : 'fa fa-search'}></i></button>
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.state.isSearching && <Loader text="Searching..."/>}
        {this.state.list.length == 0 && !this.state.isSearching && <div className="no-data-found">
          <p><i className="fa fa-video-camera fa-3x"></i><br/>search somthing awesome :)</p>
        </div>}
        { this.state.isVideoPlaying && <Videoplayer url={this.state.playingVideoID} closeVideo={this.closeVideo}/>}
        {this.state.list.length > 0 &&  <div className="heading">
          <p>Showing result(s) for '{this.state.q}'</p>
        </div>}
        <div className="video-listing">
          {this.state.list.length > 0 && this.state.list.map(video =>
            <Videocard video={video} key={video.id} play={this.playVideo}/>
          )}
        </div>
      </div>
    )
  }
}

Search.propTypes = {

}

export default Search
