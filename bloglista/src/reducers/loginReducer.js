import loginService from "../services/login";
import blogService from "../services/blogs";

const reducer = (state = null, action) => {
  console.log(action.type)
  switch (action.type) {
    case 'LOGIN':
      return action.user 
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const findLoggedUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    
    return {
      type: 'LOGIN',
      user
    }
  }
  
  return {
    type: '',
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    })

    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    blogService.setToken(user.token)

    dispatch({
      type: 'LOGIN',
      user
    })
  } 
}

export const logout = () => {
  window.localStorage.removeItem('loggedBlogAppUser')
  blogService.setToken(null)
  
  return {
    type: 'LOGOUT'
  }
}

export default reducer