import React from 'react'
import { connect } from "react-redux"
import Blog from './Blog'
import BlogList from "./BlogList";
import Notification from './Notification'
import Redirect from 'react-router-dom/Redirect';
import Menu from './Menu';
import UserList from './UserList';
import User from "./User";
import { BrowserRouter as Router, Route } from 'react-router-dom'

class MainPage extends React.Component {

  render() {
    return (
      <div>
        <Router>
          <div>
            <h2>blog app</h2>

            <Menu />
            
            <Notification />
            <p/>

            <Route exact path="/" render={() => 
              <Redirect to="/blogs" />
            } />

            <Route exact path="/blogs" render={() => 
              <div>
                <BlogList />
              </div>
            } />

            <Route path="/blogs/:id" render={({ match }) => {
              if (this.props.blogs.length <= 0) return null
              
              const blog = this.props.blogs.find(b => b.id === match.params.id)
              return !blog
                ? <Redirect to="/" />
                : <Blog blog={blog} />
            }} />

            <Route exact path="/users" render={({ match }) => 
              <UserList />
            } />

            <Route path="/users/:id" render={({ match }) => {
              const user = this.props.users.find(u => u.id === match.params.id)
              return <User user={user} />
            }} />
          </div>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    users: state.users
  }
}

export default connect(
  mapStateToProps
)(MainPage)
