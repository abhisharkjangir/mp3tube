import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Loader from '../../../components/loader'
import Mp3card from '../../../components/mp3'

class Toppunjabi extends Component {
  constructor() {
    super()
    this.state = {
       punjabi : [], isPunjabiLoading : false
    };
  }

  componentWillMount(){
      this.setState({isPunjabiLoading : true})
    fetch('http://imabhi.herokuapp.com/yt/tp')
    .then(r => r.json())
    .then(r => {
      if (r.success){
        this.setState({punjabi : r.data, isPunjabiLoading : false});
      }
    })
  }


  render() {
    return (
    <div className="trending">
      <div className="heading">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-6 p-0"><p> Top Punjabi </p></div>
          </div>
        </div>
      </div>
      {this.state.isPunjabiLoading && <Loader />}
      {this.state.punjabi.map((mp3,i) => <Mp3card key={mp3.info.track} mp3={mp3.info} play={this.playVideo} />)}


    </div>    )
  }
}

Toppunjabi.propTypes = {

}

export default Toppunjabi
