import { SHOW_LOADER, HIDE_LOADER, SHOW_MESSAGE, HIDE_MESSAGE } from '../types'

export const showAppLoader = () => {
	return {
		type: SHOW_LOADER
	}
}

export const hideAppLoader = () => {
	return {
		type: HIDE_LOADER
	}
}

export function showMessage(text, type = 'message') {
	if (!(type === 'success' || type === 'error')) {
		type = 'message'
	}

	return {
		type: SHOW_MESSAGE,
		payload: {
			id: Date.now().toString() + Math.random(),
			type,
			text
		}
	}
}

export function hideMessage(id) {
	return {
		type: HIDE_MESSAGE,
		payload: id
	}
}
