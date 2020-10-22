import React from 'react'
import { NavLink } from 'react-router-dom'

import prettyClassName from '../helpers/prettyClassName'

const Navigation = props => (
	<nav className={prettyClassName(['navigation', props.className])}>
		<ul className='navigation__list'>
			<li className='navigation__item'>
				<NavLink
					exact
					to='/'
					className='navigation__link'
					activeClassName='navigation__link--active'
				>
					<span className='navigation__text'>Главная страница</span>
					<i className='navigation__icon fas fa-home' />
				</NavLink>
			</li>
			<li className='navigation__item'>
				<NavLink
					exact
					to='/tasks'
					className='navigation__link'
					activeClassName='navigation__link--active'
				>
					<span className='navigation__text'>Список задач</span>
					<i className='navigation__icon fas fa-list' />
				</NavLink>
			</li>
			<li className='navigation__item navigation__item--profile'>
				<span className='navigation__text'>{props.userName}</span>
			</li>
		</ul>
	</nav>
)

export default Navigation
