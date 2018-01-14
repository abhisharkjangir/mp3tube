import React from 'react'

const Loader = (props) => (
  <div className="loading">
    <div className="loading-bar"></div>
    <div className="loading-bar"></div>
    <div className="loading-bar"></div>
    <div className="loading-bar"></div>
    <p>{props.text ? props.text : 'Loading...'}</p>
  </div>
)

export default Loader
