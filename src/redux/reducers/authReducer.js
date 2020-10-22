import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR } from "../types"

const initialState = {
	isAuth: false,
	isLoading: false,
	userEmail: '',
	errorMessage: ''
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				...initialState,
				isLoading: true
			}
		case LOGIN_SUCCESS:
			return {
				...state,
				isAuth: true,
				isLoading: false,
				userEmail: action.payload.email,
				errorMessage: ''
			}
		case LOGIN_ERROR:
			return {
				...state,
				isAuth: false,
				isLoading: false,
				errorMessage: action.payload
			}
		case LOGOUT_REQUEST:
			return {
				...state,
				isLoading: true
			}
		case LOGOUT_SUCCESS:
			return initialState
		case LOGOUT_ERROR:
			return {
				...state,
				isLoading: false,
				errorMessage: action.payload
			}
		default:
			return state
	}
}
