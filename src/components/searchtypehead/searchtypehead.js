import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {asyncContainer,AsyncTypeahead, Typeahead} from 'react-bootstrap-typeahead';
import { hashHistory, Router } from 'react-router'

class Searchtypehead extends Component{
  constructor(){
    super()
    this.state = {
      options : []
    }
  }

  renderMenuItemChildren(option, props, index) {
    return (
      <div key={option.title}>
        <span>{option.title}</span>
      </div>
    );
  }

  handleSearch = query => {
    if (!query) return
    fetch(`https://mp3tube1.herokuapp.com/youtube/search?q=${query}`)
    .then(resp => resp.json())
    .then(result => {
      let filterResult = result.filter(video => {
        return video.kind.split('#')[1] == 'video'
      })
      this.setState({options: filterResult})
    });
  }

  handleChange = e => {
    let searchedQuery = e[0].title
    hashHistory.push(`search?q=${searchedQuery}`)
  }

  render(){
    return (
      <div className="typehead-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 p-0">
              <AsyncTypeahead className="async-typeahead"
                  {...this.state}
                  labelKey="title"
                  onSearch={this.handleSearch}
                  onChange={this.handleChange}
                  placeholder="Search song by name..."
                  renderMenuItemChildren={this.renderMenuItemChildren}
                />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Searchtypehead;
