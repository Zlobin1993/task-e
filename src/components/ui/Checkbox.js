import React from 'react'

import prettyClassName from '../../helpers/prettyClassName'

const Checkbox = props => {
	const id = props.id || `checkbox-${Math.random}`

	return (
		<div className={prettyClassName(['checkbox', props.className])}>
			<input
				className='checkbox__input'
				type='checkbox'
				id={id}
				name={props.name}
				checked={props.checked}
				required={props.required}
				disabled={props.disabled}
				onChange={props.onChange}
			/>
			<label
				className='checkbox__label'
				htmlFor={id}
			/>
		</div>
	)
}

export default Checkbox