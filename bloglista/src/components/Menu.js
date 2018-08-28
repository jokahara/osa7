import React from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from '../reducers/loginReducer';
import { Menu, Button } from "semantic-ui-react";

class MenuBar extends React.Component {

  render() {
    return (
      <Menu inverted>
        <Menu.Item link>
          <Link to="/">blogs</Link> &nbsp;
        </Menu.Item>
        <Menu.Item link>
          <Link to="/users">users</Link> &nbsp;
        </Menu.Item>  
        <Menu.Item>
          <em>{this.props.loggedUser.name} logged in</em>
        </Menu.Item>  
        <Menu.Item link>
          <Link to="/" onClick={this.props.logout}>
            logout
          </Link>
        </Menu.Item>  
      </Menu>
    )
  }
}
  

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser
  }
}

export default connect(
  mapStateToProps,
  { logout }
)(MenuBar)