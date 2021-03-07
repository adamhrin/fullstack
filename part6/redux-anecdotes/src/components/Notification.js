import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  return (
    <div style={props.notification.style}>
      {props.notification.message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps)(Notification)