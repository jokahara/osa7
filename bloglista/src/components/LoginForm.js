import React from 'react'
import Notification from "./Notification"
import { connect } from "react-redux";
import { login } from "../reducers/loginReducer";
import { createNew } from "../reducers/userReducer";
import { notify } from "../reducers/notificationReducer";
import { handleFieldChange } from "../reducers/formReducer";
import { Form, Button } from "semantic-ui-react";

class LoginForm extends React.Component {

  handleChange = (event) => {
    event.preventDefault()

    this.props.handleFieldChange(event.target.name, event.target.value)
  }

  loginHandler = async (event) => {
    event.preventDefault()

    try {
      await this.props.login(this.props.username, this.props.password)
    } catch (exception) {
      this.props.notify('wrong username or password', 3)
    }
  }

  render() {
    return (
      <div>
        <h1>Log in to application</h1>  

        <Notification />

        <Form onSubmit={this.loginHandler}>
          <Form.Field>
            <label>username:</label>
            <input
              type="text"
              name="username"
              value={this.props.username}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>password:</label>
            <input
              type="password"
              name="password"
              value={this.props.password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Button type="submit">login</Button>
        </Form>
      </div>  
    )
  }

}

const mapStateToProps = (state) => {
  return {
    username: state.forms.username,
    password: state.forms.password
  }
}

export default connect(
  mapStateToProps,
  { handleFieldChange, login, createNew, notify }
)(LoginForm)