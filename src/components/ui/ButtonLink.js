import React from 'react'
import { Link } from 'react-router-dom'

import prettyClassName from '../../helpers/prettyClassName'

const ButtonLink = props => (
	<Link
		className={prettyClassName([
			'button',
			'button--linked',
			props.isPrimary && 'button--primary',
			props.isSecondary && 'button--secondary',
			props.className
		])}
		to={props.to || '/'}
		aria-label={props.ariaLabel}
	>{props.children}</Link>
)

export default ButtonLink
