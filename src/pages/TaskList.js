import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { readTask } from '../redux/actions/taskActions'

import Calendar from '../components/Calendar'
import Result from '../components/Result'
import Task from '../components/Task'
import TaskForm from '../components/TaskForm'

class TaskList extends React.Component {
	getDoneCount = () => {
		let count = 0

		this.props.taskList.forEach(task => {
			task.isDone && count++
		})

		return count
	}

	componentDidMount = () => {
		if (this.props.isAuth) {
			this.props.readTask()
		}
	}

	render() {
		const taskDone = this.getDoneCount()
		const taskCount = this.props.taskList.length

		return (
			(!this.props.isAppLoading && !this.props.isAuth)
				? <Redirect to='/' />
				: <div className='task-list'>
					<div className='task-list__header'>
						<Calendar className='task-list__calendar' />
						<h1 className='task-list__title'>Задачи</h1>
						<Result
							className='task-list__result'
							taskDone={taskDone}
							taskCount={taskCount}
							isDatePassed={moment(this.props.date).startOf('day') < moment().startOf('day')}
							isLoading={this.props.isTaskLoading}
						/>
					</div>
					<ul className='task-list__content'>
						{
							this.props.taskList.length
								? this.props.taskList.map((task, index) => (
									<Task
										className='task-list__task'
										key={task.id}
										id={task.id}
										index={index + 1}
										text={task.text}
										isDone={task.isDone}
									/>
								))
								: null
						}
						<TaskForm className='task-list__task' />
					</ul>
				</div>
		)
	}
}

const mapStateToProps = state => ({
	isAuth: state.auth.isAuth,
	isAppLoading: state.app.isLoading,
	isTaskLoading: state.task.isLoading,
	date: moment(state.task.date),
	taskList: state.task.taskList
})

const mapDispatchToProps = {
	readTask
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
