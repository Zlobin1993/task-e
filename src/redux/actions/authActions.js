import { auth } from '../../helpers/firebase'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_ERROR } from '../types'

import { showAppLoader, hideAppLoader, showMessage } from './appActions'
import { readTask } from './taskActions'

export const registerRequest = (email, password) => {
	return async dispatch => {
		dispatch({ type: LOGIN_REQUEST })

		auth.createUserWithEmailAndPassword(email, password)
			.then(() => {
				if (auth.currentUser) {
					dispatch({ type: LOGIN_SUCCESS, payload: auth.currentUser })
					dispatch(showMessage('Вы успешно зарегистрированы!', 'success'))
				}
				else {
					throw new Error()
				}
			})
			.catch((error) => {
				switch (error.code) {
					case 'auth/invalid-email':
						dispatch({ type: LOGIN_ERROR, payload: 'Некорректный формат электронной почты.' })
						break
					case 'auth/email-already-in-use':
						dispatch({ type: LOGIN_ERROR, payload: 'Такой пользователь уже существует.' })
						break
					case 'auth/operation-not-allowed':
						dispatch({ type: LOGIN_ERROR, payload: 'Операция не разрешена. Попробуйте позже.' })
						break
					case 'auth/weak-password':
						dispatch({ type: LOGIN_ERROR, payload: 'Слишком слабый пароль.' })
						break
					default:
						dispatch({ type: LOGIN_ERROR, payload: 'Ошибка. Проверьте данные и попробуйте снова.' })
				}
			})
	}
}

export const autoLogin = () => {
	return async dispatch => {
		dispatch(showAppLoader())

		auth.onAuthStateChanged((user) => {
			if (user) {
				dispatch({ type: LOGIN_SUCCESS, payload: auth.currentUser })
				dispatch(hideAppLoader())
				dispatch(readTask())
			} else {
				dispatch({ type: LOGOUT_SUCCESS })
				dispatch(hideAppLoader())
			}
		})
	}
}

export const loginRequest = (email, password) => {
	return async dispatch => {
		dispatch({ type: LOGIN_REQUEST })

		auth.signInWithEmailAndPassword(email, password)
			.then(() => {
				if (auth.currentUser) {
					dispatch({ type: LOGIN_SUCCESS, payload: auth.currentUser })
				}
				else {
					throw new Error('Нет авторизированного пользователя.')
				}
			})
			.catch((error) => {
				switch (error.code) {
					case 'auth/invalid-email':
						dispatch({ type: LOGIN_ERROR, payload: 'Некорректный формат электронной почты.' })
						break
					case 'auth/user-disabled':
						dispatch({ type: LOGIN_ERROR, payload: 'Пользователь заблокирован.' })
						break
					case 'auth/user-not-found':
						dispatch({ type: LOGIN_ERROR, payload: 'Такого пользователя не существует.' })
						break
					case 'auth/wrong-password':
						dispatch({ type: LOGIN_ERROR, payload: 'Неверный пароль.' })
						break
					default:
						dispatch({ type: LOGIN_ERROR, payload: 'Ошибка. Проверьте данные и попробуйте снова.' })
						console.log('Login error:', error)
				}
			})
	}
}

export const logoutRequest = () => {
	return async dispatch => {
		dispatch({ type: LOGOUT_REQUEST })

		auth.signOut()
			.then(() => {
				if (!auth.currentUser) {
					dispatch({ type: LOGOUT_SUCCESS })
				}
				else {
					throw new Error('Нет авторизированного пользователя.')
				}
			})
			.catch((error) => {
				dispatch({ type: LOGOUT_ERROR, payload: 'Ошибка. Попробуйте снова.' })
				console.log(error)
			})
	}
}
