import React from 'react'

import prettyClassName from '../helpers/prettyClassName'

const Loader = props => (
	<div
		className={prettyClassName([
			'loader',
			props.white && 'loader--white',
			props.className
		])}
		aria-label='Загрузка, подождите'
	/>
)

export default Loader
