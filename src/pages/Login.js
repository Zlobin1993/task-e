import React from 'react'

import Attention from '../components/Attention'
import LoginForm from '../components/LoginForm'

const Login = () => (
	<div className='login'>
		<div className='login__content'>
			<h1 className='login__title'>Сделай,<br />это&nbsp;просто.</h1>
			<p className='login__text'>
				<Attention>Task-e&nbsp;</Attention>
				<span>&mdash;&nbsp;это бесплатное онлайн-приложение для планирования твоего времени, в котором сочетаются локаничность и простота.</span>
			</p>
		</div>
		<LoginForm />
	</div>
)

export default Login
