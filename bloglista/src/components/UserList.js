import React from 'react'
import { connect } from "react-redux"
import { Link } from "react-router-dom";

class UserList extends React.Component {

  render() {
    return (
      <div>
        <h3>Users</h3>
        <table class='ui celled collapsing table'>
          <thead>
            <tr>
              <th />
              <th>blogs</th>
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(user =>
              <tr key={user.id}>
                <td> 
                  <Link to={`/users/${user.id}`}>{user.name}</Link> 
                </td>
                <td class='ui center aligned'>{user.blogs.length}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )
  }
}
  

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

export default connect(
  mapStateToProps
)(UserList)