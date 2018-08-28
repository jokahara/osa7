import React from 'react'
import LoginForm from "./components/LoginForm"
import { connect } from "react-redux"
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from "./reducers/userReducer"
import { findLoggedUser } from "./reducers/loginReducer"
import { Container } from "semantic-ui-react"
import MainPage from './components/MainPage'

class App extends React.Component {

  componentDidMount = async () => {
    this.props.findLoggedUser()
    await this.props.initializeBlogs()
    await this.props.initializeUsers()
  }

  render() {
    return (
      <Container>
        {!this.props.loggedUser 
          ? <LoginForm />
          : <MainPage />
        }
      </Container>
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
  { initializeBlogs, initializeUsers, findLoggedUser }
)(App)
