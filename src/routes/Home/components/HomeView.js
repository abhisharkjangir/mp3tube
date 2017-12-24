import React, {Component} from 'react'
import {IndexLink, Link} from 'react-router'


class HomeView extends Component {
  
  render() {
    return (
      <div>
      <h1>This is home route</h1>
      <a href="/counter">Go to  Counter</a>
      </div>
    )
  }
}

export default HomeView
