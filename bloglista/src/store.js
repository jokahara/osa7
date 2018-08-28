import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import notificationReducer from "./reducers/notificationReducer";
import loginReducer from "./reducers/loginReducer";
import formReducer from "./reducers/formReducer";


const reducer = combineReducers({
  blogs: blogReducer,
  users: userReducer,
  notification: notificationReducer,
  loggedUser: loginReducer,
  forms: formReducer
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store