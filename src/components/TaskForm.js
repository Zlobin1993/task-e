import React from 'react'
import { connect } from 'react-redux'

import { createTask } from '../redux/actions/taskActions'

import prettyClassName from '../helpers/prettyClassName'

import Button from './ui/Button'

class TaskForm extends React.Component {
	state = {
		isAdding: false,
		text: ''
	}

	changeTextHandler = event => {
		let text = event.target.value

		if (text.length === 400) {
			text = text.slice(0, 397) + '...'
		}

		this.setState({
			text
		})
	}

	addHandler = () => {
		this.setState({
			isAdding: true
		})
	}

	confirmHandler = (event) => {
		event.preventDefault()

		this.props.createTask(this.state.text, this.props.date)

		this.setState({
			isAdding: false,
			text: ''
		})
	}

	cancelHandler = (event) => {
		event.preventDefault()

		this.setState({
			isAdding: false
		})
	}

	render() {
		return (
			<li
				className={prettyClassName(['task-form', this.props.className])}>
				{
					this.state.isAdding
						? <div className='task-form__container'>
							<div className='task-form__content'>
								<form
									className='task-form__form'
									onSubmit={event => this.confirmHandler(event)}
								>
									<textarea
										className='task-form__textarea textarea'
										placeholder='Текст задачи'
										maxLength={400}
										defaultValue={this.state.text}
										required
										autoFocus
										onChange={event => this.changeTextHandler(event)}
										onFocus={event => event.target.selectionStart = event.target.value.length}
									/>
									<div className='task-form__button-list'>
										<Button
											className='task-form__button'
											isPrimary
											type='submit'
											disabled={this.props.isLoading}
										>Добавить</Button>
										<Button
											className='task-form__button'
											isSecondary
											onClick={event => this.cancelHandler(event)}
											disabled={this.props.isLoading}
										>Отмена</Button>
									</div>
								</form>
							</div>
						</div>
						: <Button
							className='task-form__button task-form__button--add'
							onClick={this.addHandler}
							disabled={this.props.isLoading}
						>
							<i className="far fa-sticky-note" />
							<span>Добавить задачу</span>
						</Button>
				}
			</li>
		)
	}
}

const mapStateToProps = state => ({
	date: state.task.date,
	isLoading: state.app.isLoading || state.task.isLoading
})

const mapDispatchToProps = {
	createTask
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)
