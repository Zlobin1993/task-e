import React from 'react'
import { Link } from 'react-router-dom'

import prettyClassName from '../helpers/prettyClassName'

const Logo = props => (
	<Link
		className={prettyClassName(['logo', props.className])}
		to='/'
		aria-label='Главная страница'
	>
		<span className='logo__title'>Task-e</span>
		<span className='logo__subtitle'>Сделай, это просто.</span>
	</Link>
)

export default Logo
