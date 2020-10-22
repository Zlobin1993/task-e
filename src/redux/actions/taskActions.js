import moment from 'moment'

import { auth, database } from '../../helpers/firebase'
import { dashFormat } from '../../helpers/dateFormat'

import { READ_TASK, DATE_CHANGE, READ_REQUEST, REQUEST_DONE } from '../types'

import { showMessage } from './appActions'

export const dateChange = date => {
	return dispatch => {
		dispatch({ type: DATE_CHANGE, payload: date })
		dispatch(readTask(date))
	}
}

export const createTask = (text, date = moment()) => {
	return async (dispatch, getState) => {
		const isSelectedUser = getState().auth.isAuth && auth.currentUser
		
		if (isSelectedUser) {
			database.collection('user').doc(auth.currentUser.uid).collection(moment(date).format(dashFormat)).add({
				text,
				isDone: false,
				timestamp: moment().valueOf().toString()
			})
				.then(() => {
					dispatch(readTask(date))
					dispatch(showMessage('Задача добавлена.', 'success'))
				})
				.catch((error) => {
					dispatch(showMessage('Не удалось добавить задачу! Попробуйте позже.', 'error'))
					console.log('Create task error:', error)
				})
		}
		else {
			dispatch(showMessage('Вы не авторизированы.', 'error'))
		}
	}
}

export const readTask = (date = moment()) => {
	return async (dispatch, getState) => {
		const isSelectedUser = getState().auth.isAuth && auth.currentUser

		if (isSelectedUser) {
			dispatch({ type: READ_REQUEST })

			database.collection('user').doc(auth.currentUser.uid).collection(moment(date).format(dashFormat)).get()
			.then((dataList) => {
				const taskList = []

				dataList.forEach((dataItem) => {
					const data = dataItem.data()

					taskList.push({
						...data,
						id: dataItem.id
					})
				})

				taskList.sort((prevTask, nextTask) => prevTask.timestamp - nextTask.timestamp)

				dispatch({ type: READ_TASK, payload: taskList })
				dispatch({ type: REQUEST_DONE })
			})
			.catch((error) => {
				dispatch({ type: REQUEST_DONE })
				dispatch(showMessage('Не удалось показать задачи! Попробуйте позже.', 'error'))
				console.log('Read task error:', error)
			})
		}
		else {
			dispatch(showMessage('Вы не авторизированы.', 'error'))
		}
	}
}

export const removeTask = id => {
	return async (dispatch, getState) => {
		const isSelectedUser = getState().auth.isAuth && auth.currentUser

		if (isSelectedUser) {
			const selectedDate = getState().task.date

			database.collection('user').doc(auth.currentUser.uid).collection(moment(selectedDate).format(dashFormat)).doc(id).delete()
			.then(() => {
				dispatch(readTask(selectedDate))
				dispatch(showMessage('Задача удалена.', 'success'))
			}).catch((error) => {
				dispatch(showMessage('Не удалось удалить задачу! Попробуйте позже.', 'error'))
				console.log('Remove task error:', error)
			})
		}
		else {
			dispatch(showMessage('Вы не авторизированы.', 'error'))
		}
	}
}

export const changeTask = (id, changedData) => {
	return async (dispatch, getState) => {
		const isSelectedUser = getState().auth.isAuth && auth.currentUser

		if (isSelectedUser) {
			const taskData = getState().task.taskList.filter(task => task.id === id)[0]
			const selectedDate = getState().task.date
	
			const newData = {
				...taskData,
				...changedData
			}

			database.collection('user').doc(auth.currentUser.uid).collection(moment(selectedDate).format(dashFormat)).doc(id).set(newData)
			.then(() => {
				dispatch(readTask(selectedDate))
			})
			.catch((error) => {
				dispatch(showMessage('Не удалось изменить задачу! Попробуйте позже.', 'error'))
				console.log('Change task error:', error)
			})
		}
		else {
			dispatch(showMessage('Вы не авторизированы.', 'error'))
		}
	}
}
