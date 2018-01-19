import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Modal,Button} from 'react-bootstrap'
import cheerio from 'cheerio'
// import RP from 'request-promise';

class Mp3modal extends Component{
  constructor(){
    super()
    this.state = {

    }
  }

  componentWillMount(){
    // console.log();
    // fetch('https://keepvid.com/?url=http%3A%2F%2Fyoutube.com%2Fwatch%3Fv%3DjaGZNgosNpk#adContent')
    // .then(r => r.text())
    // .then((html) => {
    //   let $ = cheerio.load(html);
    //   let mp4_el = $('#downloadLists > div:nth-child(1) > div.item-9 > table:nth-child(1) > tbody > tr:nth-child(2) > td:nth-child(4) > a');
    //
    //   if(mp4_el) {
    //
    //   var mp4_720 = $(mp4_el).attr('href');
    //     console.log(mp4_720);
    //     this.setState({link :mp4_720 })
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
  }

  render(){
    return (
      <Modal dialogClassName="confirmation" show={this.props.open} onHide={this.props.close} bsSize="sm">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* {this.state.link && <a href={this.state.link} download>Download</a>} */}
          <p className="text-center">{this.props.body}</p><br/>
          <iframe className="button-api-frame" src={`https://youtubemp3api.com/@api/button/mp3/${this.props.id}`} width="100%" height="100%" scrolling="no" ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.no} bsSize="sm">Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default Mp3modal
