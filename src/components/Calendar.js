import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'

import { dateChange } from '../redux/actions/taskActions'

import { dashFormat } from '../helpers/dateFormat'
import prettyClassName from '../helpers/prettyClassName'

import Button from './ui/Button'

class Calendar extends React.Component {
	state = {
		renderDate: this.props.date
	}

	daySelectHandler = dayNumber => {
		this.props.dateChange(this.state.renderDate.date(dayNumber))
	}

	monthChangeHandler = renderDate => {
		this.setState({
			renderDate
		})
	}

	render() {
		const daysInMonth = this.state.renderDate.daysInMonth()
		const firstWeekDayInMonth = moment(this.state.renderDate).date(1).weekday() + 1

		const weekDayList = [...Array(7).keys()].map(weekDayNumber => weekDayNumber + 1)
		const dayList = [...Array(daysInMonth).keys()].map(dayNumber => dayNumber + 1)

		return (
			<div className={prettyClassName(['calendar', this.props.className])}>
				<div className='calendar__header'>
					<Button
						className='calendar__button'
						onClick={() => this.monthChangeHandler(moment(this.state.renderDate).month(this.state.renderDate.month() - 1))}
						disabled={this.props.isLoading}
						ariaLabel={`Сменить месяц на ${moment(this.state.renderDate).month(this.state.renderDate.month() - 1).format('MMMM YYYY')}`}
					>
						<i className='fas fa-chevron-left' />
					</Button>
					<h4 className='calendar__month'>{moment(this.state.renderDate).format('LL')}</h4>
					<Button
						className='calendar__button'
						onClick={() => this.monthChangeHandler(moment(this.state.renderDate).month(this.state.renderDate.month() + 1))}
						disabled={this.props.isLoading}
						ariaLabel={`Сменить месяц на ${moment(this.state.renderDate).month(this.state.renderDate.month() + 1).format('MMMM YYYY')}`}
					>
						<i className='fas fa-chevron-right' />
					</Button>
				</div>
				<div className='calendar__body'>
					<ul className='calendar__week'>
						{
							weekDayList.map(weekDay => (
								<li
									className='calendar__week-day'
									key={weekDay}
								>{moment().day(weekDay).format('dd')}</li>
							))
						}
					</ul>
					<ul className='calendar__table'>
						{
							dayList.map(dayNumber => (
								<li
									className='calendar__day'
									key={dayNumber}
									style={dayNumber === 1 ? { gridColumnStart: firstWeekDayInMonth } : null}
								>
									<Button
										className={prettyClassName([
											'calendar__month-day',
											moment(this.state.renderDate).date(dayNumber).format(dashFormat) === moment(this.props.date).format(dashFormat) && 'calendar__month-day--selected',
											moment(this.state.renderDate).date(dayNumber).startOf('day') < moment().startOf('day') && 'calendar__month-day--passed',
											moment(this.state.renderDate).date(dayNumber).format(dashFormat) === moment().format(dashFormat) && 'calendar__month-day--current'
										])}
										disabled={this.props.isLoading}
										onClick={() => this.daySelectHandler(dayNumber)}
										ariaLabel={`Сменить дату на ${moment(this.state.renderDate).date(dayNumber).format('D MMMM[,] dddd')}`}
									>{dayNumber}</Button>
								</li>
							))
						}
					</ul>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	date: moment(state.task.date),
	isLoading: state.app.isLoading || state.task.isLoading
})

const mapDispatchToProps = {
	dateChange
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
