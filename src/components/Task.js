import React from 'react'
import { connect } from 'react-redux'

import { removeTask, changeTask } from '../redux/actions/taskActions'

import prettyClassName from '../helpers/prettyClassName'

import Button from './ui/Button'

class Task extends React.Component {
	state = {
		isChanging: false,
		newText: this.props.text
	}

	changeHandler = () => {
		this.setState({
			isChanging: !this.state.isChanging
		})
	}

	removeHandler = () => {
		this.props.removeTask(this.props.id)
	}

	checkHandler = () => {
		this.props.changeTask(this.props.id, {
			isDone: !this.props.isDone
		})
	}

	changeTextHandler = event => {
		let newText = event.target.value

		if (newText.length === 400) {
			newText = newText.slice(0, 397) + '...'
		}

		this.setState({
			newText
		})
	}

	changeCompleteHandler = event => {
		event.preventDefault()

		this.setState({
			isChanging: false
		})

		this.props.changeTask(this.props.id, {
			text: this.state.newText
		})
	}

	render() {
		return (
			<li
				className={prettyClassName([
					'task',
					this.state.isChanging && 'task--is-changing',
					this.props.className
				])}
			>
				<div className='task__control-list'>
					<Button
						className='task__control task__control--green'
						onClick={() => this.changeHandler()}
						disabled={this.props.isLoading}
						ariaLabel={this.state.isChanging ? `Отменить редактирование задачи №${this.props.index}` : `Редактировать задачу №${this.props.index}`}
					>
						{
							this.state.isChanging
								? <i className="fas fa-ban" />
								: <i className="far fa-edit" />
						}
					</Button>
					<Button
						className='task__control task__control--red'
						onClick={() => this.removeHandler()}
						disabled={this.props.isLoading}
						ariaLabel={`Удалить задачу №${this.props.index}`}
					>
						<i className="far fa-trash-alt" />
					</Button>
				</div>
				<div className='task__container'>
					<div className='task__content'>
						{
							this.state.isChanging
								? <form
									className='task__form'
									onSubmit={event => this.changeCompleteHandler(event)}
								>
									<textarea
										className='task__textarea textarea'
										placeholder='Текст задачи'
										maxLength={400}
										defaultValue={this.props.text}
										required
										autoFocus
										onChange={event => this.changeTextHandler(event)}
										onFocus={event => event.target.selectionStart = event.target.value.length}
									/>
									<Button
										className='button--primary'
										type='submit'
										disabled={this.props.isLoading}
									>Применить</Button>
								</form>
								: <p className='task__text'>{this.props.text}</p>
						}
					</div>
					<Button
						className={prettyClassName([
							'task__indicator',
							this.props.isDone && 'task__indicator--success'
						])}
						onClick={() => this.checkHandler()}
						disabled={this.state.isChanging || this.props.isLoading}
						ariaLabel={this.props.isDone ? 'Пометить задачу, как невыполненную' : 'Пометить задачу, как выполненную'}
					>
						<i className="fas fa-check" />
					</Button>
				</div>
			</li>
		)
	}
}

const mapStateToProps = state => ({
	isLoading: state.app.isLoading || state.task.isLoading
})

const mapDispatchToProps = {
	removeTask,
	changeTask
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
