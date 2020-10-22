import { combineReducers } from 'redux'

import { appReducer } from './reducers/appReducer'
import { authReducer } from './reducers/authReducer'
import { taskReducer } from './reducers/taskReducer'

export const rootReducer = combineReducers({
	app: appReducer,
	auth: authReducer,
	task: taskReducer
})
