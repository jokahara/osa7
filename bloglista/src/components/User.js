import React from 'react'

class User extends React.Component {

  render() {
    const user = this.props.user
    
    if (!user) return null

    return (
      <div>
        <h1>{user.name}</h1>

        <h2>Added blogs</h2>
        <ul>
          {user.blogs.map(blog => 
            <li key={blog._id}>{blog.title} by {blog.author}</li>
          )}
        </ul>
      </div>
    )
  }
}

export default User