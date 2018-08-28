
const initialState = {
  username: '',
  password: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_FIELD':
      return { ...state, [action.key]: action.value }
    default:
      return state
  }
}

export const handleFieldChange = (key, value) => {
  return {
    type: 'CHANGE_FIELD',
    key,
    value
  }
}

export default reducer