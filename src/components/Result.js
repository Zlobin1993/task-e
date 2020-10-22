import React from 'react'

import prettyClassName from '../helpers/prettyClassName'

import Loader from './Loader'

const Result = props => (
	<div className={prettyClassName(['result', props.className])}>
		{
			props.isLoading
				? <Loader white />
				: props.taskCount
					? <React.Fragment>
						<div className='result__block'>
							<p className='result__value'>
								{props.taskDone}
								&nbsp;из&nbsp;
								{props.taskCount}
							</p>
							<p className='result__label'>выполнено</p>
						</div>
						<p className='result__percent'>
							/&nbsp;
							{props.taskCount === 0 ? 0 : Math.round(props.taskDone / (props.taskCount / 100))}
							%
						</p>
					</React.Fragment>
					: <p className='result__value'>{props.isDatePassed ? 'Задач на эту дату не было.' : 'Задач еще нет, добавь первую!'}</p>
		}
	</div>
)

export default Result
