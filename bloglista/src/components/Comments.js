import React from 'react'
import { connect } from "react-redux"
import { comment } from "../reducers/blogReducer";
import { handleFieldChange } from "../reducers/formReducer";
import { notify } from "../reducers/notificationReducer";
import { Form, Button, Input, List, ListItem } from "semantic-ui-react";

class Comments extends React.Component {

  componentDidMount() {
    this.props.handleFieldChange('newComment', '')
  }

  handleChange = (event) => {
    event.preventDefault()
    
    this.props.handleFieldChange(event.target.name, event.target.value)
  }

  addComment = async (event) => {
    event.preventDefault()
    
    const newComment = this.props.newComment
    const blog = this.props.blog
    
    if (!newComment || newComment.length < 1) return

    this.props.comment(blog, this.props.newComment)
    this.props.notify(`comment '${newComment}' added to blog ${blog.title}`)
  }

  render() {
    if (this.props.newComment === undefined) return null

    const comments = !this.props.blog.comments ? [] : this.props.blog.comments

    return (
      <div>
        <h3>comments</h3>

        <Form onSubmit={this.addComment}>
          <Input 
              type="text"
              name="newComment"
              value={this.props.newComment}
              onChange={this.handleChange}
          />
          <Button type="submit">add comment</Button>
        </Form>

        <List bulleted>
          {comments.map(comment => 
            <ListItem key={comment}>{comment}</ListItem>
          )}
        </List>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    newComment: state.forms.newComment,
  }
}

export default connect(
  mapStateToProps,
  { comment, handleFieldChange, notify }
)(Comments)