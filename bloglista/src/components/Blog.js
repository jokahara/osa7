import React from 'react'
import { connect } from "react-redux"
import { like, removeBlog } from "../reducers/blogReducer"
import { notify } from "../reducers/notificationReducer"
import Comments from './Comments';
import { Button, Label, Divider } from "semantic-ui-react";

class Blog extends React.Component {
  
  addLike = async (event) => {
    event.preventDefault()

    await this.props.like(this.props.blog)
  }

  delete = async (event) => {
    event.preventDefault()

    const blog = this.props.blog

    try {
      if (!window.confirm(`delete '${blog.title}' by ${blog.author}?`))
        return

      await this.props.removeBlog(blog)
      this.props.notify(`'${blog.title}' by ${blog.author} removed`)
    } catch (exception) {
      this.props.notify(exception.toString(), 'error')
    }
  }

  render() {
    const blog = this.props.blog
    const user = this.props.user

    if (!blog) return null

    const likeButton = 
      <div class='ui left labeled button'> 
        <Label basic pointing='right'>{blog.likes}</Label>
        <Button compact onClick={this.addLike}>like</Button>
      </div>

    const deleteButton = 
      !blog.user || blog.user._id === user.id || blog.user === user.id
      ? <Button compact basic size="small" color="red" onClick={this.delete}>
          delete
        </Button>  
      : null

    return (
      <div>
        <h2>{blog.title} {blog.author}</h2>
        
        <div> <a href={blog.url}>{blog.url}</a> </div>
        {blog.user 
          ? <div> added by {blog.user.name} </div> 
          : null
        }
        
        <Divider />
        {likeButton}
        <p />
        {deleteButton}

        <Divider />
        <Comments blog={blog}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedUser
  }
}

export default connect(
  mapStateToProps,
  { like, removeBlog, notify }
)(Blog)