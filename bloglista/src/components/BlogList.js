import React from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import NewBlogForm from "./NewBlogForm";
import { handleFieldChange } from "../reducers/formReducer";
import { Table } from "semantic-ui-react";

class BlogList extends React.Component {

  componentDidMount() {
    this.props.handleFieldChange('visible', false)
  }

  toggleVisibility = () => {
    this.props.handleFieldChange('visible', !this.props.visible)
  }

  render() {
    const blogs = this.props.blogs.sort((a, b) => b.likes - a.likes)

    const hideWhenVisible = { display: this.props.visible ? 'none' : '' }
    const showWhenVisible = { display: this.props.visible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button class='ui primary button' onClick={this.toggleVisibility}>create new</button>
        </div>
        <div style={showWhenVisible}>
          <NewBlogForm />
          <button class='ui secondary button' onClick={this.toggleVisibility}>cancel</button>
        </div>

        <h3>Blogs</h3>
        <Table striped celled>
          <Table.Body>
            {blogs.map(blog => 
              <Table.Row key={blog.id}>
                <Table.Cell>
                  <Link to={`blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    visible: state.forms.visible
  }
}

export default connect(
  mapStateToProps,
  { handleFieldChange }
)(BlogList)