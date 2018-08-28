import userService from "../services/users";

const reducer = (store = [], action) => {
  switch (action.type) {
    case 'CREATE_USER':
      return [...store, action.content]
    case 'INIT_USERS':
      return action.data
    default:
      return store
  }
}

export const createNew = (username, name, password) => {
  return async (dispatch) => {
    const newUser = await userService.create({
      username,
      name,
      password
    })
    dispatch({
      type: 'CREATE_USER',
      content: newUser
    })
  }
}

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      data: users
    })
  }
}

export default reducer