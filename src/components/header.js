import React from 'react'
import PropTypes from 'prop-types'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';

class Header extends React.Component {

  goToUrl (url){
    this.props.history.push(url);
  }

  render () {
    return (
      <div>
        <Navbar collapseOnSelect  fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/"><img src="https://i.imgur.com/Z6DC6nq.png"/></a>
            </Navbar.Brand>
            {/* <a className="navbar-toggle text-center" onClick={() => this.goToUrl('search')}><i className="fa fa-search"></i><br/> Search</a> */}
            {/* <a className="navbar-toggle text-center"><i className="fa fa-thumbs-o-up"></i><br/> Liked</a> */}
            {/* <a className="navbar-toggle text-center" href="/trending"><i className="fa fa-fire"></i><br/> Trending</a> */}
          </Navbar.Header>

        </Navbar>
      </div>
    )
  }
}

export default Header
