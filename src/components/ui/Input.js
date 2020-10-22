import React from 'react'

import prettyClassName from '../../helpers/prettyClassName'

const Input = props => {
	const id = props.id || `input-${Math.random}`

	return (
		<div className={prettyClassName(['input', props.className])}>
			{
				props.label &&
				<label
					className='input__label'
					htmlFor={id}
				>{props.label}</label>
			}
			<input
				className='input__field'
				id={id}
				type={props.type || 'text'}
				name={props.name}
				aria-label={props.ariaLabel}
				value={props.value}
				required={props.required}
				placeholder={props.placeholder}
				disabled={props.disabled}
				onChange={props.onChange}
			/>
			<span
				className={prettyClassName([
					'input__error',
					props.errorMessage && 'input__error--show'
				])}
			>{props.errorMessage}</span>
		</div>
	)
}

export default Input
