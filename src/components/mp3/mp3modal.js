import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Modal,Button} from 'react-bootstrap'

class Mp3modal extends Component{
  constructor(){
    super()
  }

  componentWillMount(){

  }

  render(){
    return (
      <Modal dialogClassName="confirmation" show={this.props.open} onHide={this.props.close} bsSize="sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">{this.props.body}</p> <br/>
          <iframe className="button-api-frame" src={`https://youtubemp3api.com/@api/button/mp3/${this.props.id}`} width="100%" height="100%" scrolling="no" ></iframe>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.yes} bsStyle="primary" bsSize="sm">{this.props.yesBtnLabel}</Button>
          <Button onClick={this.props.no} bsSize="sm">{this.props.noBtnLabel}</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default Mp3modal
