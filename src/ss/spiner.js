import PropTypes from 'prop-types'
import React, { Component } from 'react'

export class Spinner extends Component {
  static propTypes = {}

  render() {
    return (
      <div> 
        <button class="btn btn-primary" type="button" disabled>
        <span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
        <span role="status">Loading...</span>
      </button>
        
    </div>
    )
  }
}

export default Spinner;
