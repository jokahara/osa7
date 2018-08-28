import React from 'react'
import { connect } from "react-redux";
import { createNew } from "../reducers/blogReducer";
import { notify } from "../reducers/notificationReducer";
import { handleFieldChange } from "../reducers/formReducer";
import { Form, Button, Input } from "semantic-ui-react";

class NewBlogForm extends React.Component {
  
  componentDidMount() {
    this.props.handleFieldChange('title', '')
    this.props.handleFieldChange('author', '')
    this.props.handleFieldChange('url', '')
  }

  addBlog = async (event) => {
    event.preventDefault()

    try {
      if (this.props.title.length < 1) {
        return this.props.notify('title is missing')
      }

      if (this.props.author.length < 1) {
        return this.props.notify('author is missing')
      }

      if (this.props.url.length < 1) {
        return this.props.notify('url is missing')
      }

      const newBlog = {
        title: this.props.title,
        author: this.props.author,
        url: this.props.url
      }

      this.props.handleFieldChange('title', '')
      this.props.handleFieldChange('author', '')
      this.props.handleFieldChange('url', '')
      this.props.handleFieldChange('visible', false)

      await this.props.createNew(newBlog)
      
      this.props.notify(`a new blog '${newBlog.title}' by ${newBlog.author} added`)
    } catch (exception) {
      this.props.notify(exception.toString())
    }
  }

  handleChange = (event) => {
    event.preventDefault()

    this.props.handleFieldChange(event.target.name, event.target.value)
  }

  render() {
    if (this.props.url === undefined) {
      return null
    }

    return (
      <div>
        <h3>create new</h3>
        <Form onSubmit={this.addBlog}>
          <Form.Group grouped widths='2'>
            <Form.Field>
              <Input 
                label="title"
                type="text"
                name="title"
                value={this.props.title}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Input 
              label="author"
                type="text"
                name="author"
                value={this.props.author}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Input 
                label="url"
                type="text"
                name="url"
                value={this.props.url}
                onChange={this.handleChange}
              />
            </Form.Field>
          </Form.Group>
          <Button type="submit">create</Button>
        </Form>
      </div>
    )
  }
}
  

const mapStateToProps = (state) => {
  return {
    title: state.forms.title,
    author: state.forms.author,
    url: state.forms.url
  }
}

export default connect(
  mapStateToProps,
  { createNew, notify, handleFieldChange }
)(NewBlogForm)