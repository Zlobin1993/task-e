import React from 'react'

import prettyClassName from '../../helpers/prettyClassName'

const Button = props => (
	<button
		className={prettyClassName([
			'button',
			props.isPrimary && 'button--primary',
			props.isSecondary && 'button--secondary',
			props.className
		])}
		id={props.id}
		type={props.type}
		name={props.name}
		aria-label={props.ariaLabel}
		form={props.form}
		disabled={props.disabled}
		onClick={props.onClick}
	>{props.children}</button>
)

export default Button
