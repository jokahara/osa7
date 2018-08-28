import blogService from "../services/blogs";

const reducer = (store = [], action) => {
  console.log(action.type)
  console.log(action)
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'LIKE':
      const old = store.filter(a => a.id !== action.id)
      const liked = store.find(a => a.id === action.id)

      return [...old, { ...liked, likes: liked.likes+1} ]
    case 'CREATE_BLOG':
      return [...store, action.content]
    case 'REMOVE_BLOG':
      return store.filter(a => a.id !== action.id)
    case 'COMMENT':
      return [...store.filter(a => a.id !== action.id), action.content]
    default:
      return store
  }
}

export const createNew = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    console.log(newBlog)
    dispatch({
      type: 'CREATE_BLOG',
      content: newBlog
    })
  }
}

export const like = (blog) => {
  return async (dispatch) => {
    await blogService.update(
      blog.id, 
      {...blog, likes: blog.likes + 1}
    )
    dispatch({
      type: 'LIKE',
      id: blog.id,
      content: blog.content
    })
  } 
}

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      id: blog.id
    })
  }
}

export const comment = (blog, comment) => {
  return async (dispatch) => {
    const comments = !blog.comments ? [] : blog.comments
    const updated = {...blog, comments: comments.concat([comment])}

    await blogService.update(
      blog.id, 
      updated
    )
    dispatch({
      type: 'COMMENT',
      id: blog.id,
      content: updated
    })
  } 
}


export default reducer