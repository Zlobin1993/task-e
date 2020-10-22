import React from 'react'

import Attention from '../components/Attention'
import ButtonLink from '../components/ui/ButtonLink'

const NotFound = () => (
	<div className='not-found'>
		<h1 className='not-found__title'>404</h1>
		<p className='not-found__text'>
			<Attention>Упс!&nbsp;</Attention>
			<span>Такой страницы не существует.</span>
		</p>
		<ButtonLink
			className='not-found__button button--light'
			to='/'
		>Вернуться на главную страницу</ButtonLink>
	</div>
)

export default NotFound
