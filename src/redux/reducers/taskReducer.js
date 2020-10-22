import moment from 'moment'

import { READ_TASK, DATE_CHANGE, READ_REQUEST, REQUEST_DONE } from "../types"

const initialState = {
	date: moment(),
	taskList: [],
	isloading: false
}

export const taskReducer = (state = initialState, action) => {
	switch (action.type) {
		case READ_TASK:
			return {
				...state,
				taskList: action.payload
			}
		case DATE_CHANGE:
			return {
				...state,
				date: action.payload
			}
		case READ_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case REQUEST_DONE:
			return {
				...state,
				isLoading: false
			}
		default:
			return state
	}
}
