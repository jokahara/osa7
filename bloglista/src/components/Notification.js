import React from 'react'
import { connect } from 'react-redux'
import { Message } from "semantic-ui-react";

class Notification extends React.Component {
  render() {
    return (
      this.props.notification 
        ? <Message success>
            {this.props.notification}
          </Message> 
        : null
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)
