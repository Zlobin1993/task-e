import { SHOW_LOADER, HIDE_LOADER, HIDE_MESSAGE, SHOW_MESSAGE } from "../types"

const initialState = {
	isLoading: true,
	messageList: []
}

export const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case SHOW_LOADER:
			return {
				...state,
				isLoading: true
			}
		case HIDE_LOADER:
			return {
				...state,
				isLoading: false
			}
		case SHOW_MESSAGE:
			return {
				...state,
				messageList: [...state.messageList, {
					id: action.payload.id,
					type: action.payload.type,
					text: action.payload.text
				}]
			}
		case HIDE_MESSAGE:
			return {
				...state,
				messageList: state.messageList.filter((message) => message.id !== action.payload)
			}
		default:
			return state
	}
}
