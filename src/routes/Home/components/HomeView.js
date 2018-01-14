import React, {Component} from 'react'
import {IndexLink, Link} from 'react-router'


class HomeView extends Component {

  render() {
    return (
      <div>
      <a href="/trending">Trending Videos</a><br/>
      <a href="/search">Search Videos</a>
      </div>
    )
  }
}

export default HomeView
