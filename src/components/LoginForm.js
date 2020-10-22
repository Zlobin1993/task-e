import React from 'react'
import { connect } from 'react-redux'

import { registerRequest, loginRequest, logoutRequest } from '../redux/actions/authActions'

import Input from './ui/Input'
import Button from './ui/Button'
import ButtonLink from './ui/ButtonLink'
import Loader from './Loader'

class LoginForm extends React.Component {
	state = {
		email: {
			value: '',
			errorMessage: ''
		},
		password: {
			value: '',
			errorMessage: ''
		}
	}

	submitHandler = event => {
		event.preventDefault()
	}

	changeInputHandler = event => {
		event.persist()

		this.setState(prevState => {
			prevState[event.target.name].value = event.target.value.split(' ').join('')
			return prevState
		})
	}

	validateEmail = email => {
		if (email.indexOf('@') > 0 && email.indexOf(' ') < 0) {
			return true
		}
		else {
			return false
		}
	}

	validatePassword = password => {
		if (password.length >= 6 && password.indexOf(' ') < 0) {
			return true
		}
		else {
			return false
		}
	}

	buttonClickHandler = (event) => {
		const isEmailValidated = this.validateEmail(this.state.email.value)
		const isPasswordValidated = this.validatePassword(this.state.password.value)

		if (isEmailValidated) {
			this.setState(prevState => {
				prevState.email.errorMessage = ''
				return prevState
			})
		}
		else {
			this.setState(prevState => {
				prevState.email.errorMessage = 'Некорректный email'
				return prevState
			})
		}

		if (isPasswordValidated) {
			this.setState(prevState => {
				prevState.password.errorMessage = ''
				return prevState
			})
		}
		else {
			this.setState(prevState => {
				prevState.password.errorMessage = 'Пароль должен быть не менее 6 символов'
				return prevState
			})
		}

		if (isEmailValidated && isPasswordValidated) {
			event.target.name === 'register' && this.props.registerRequest(this.state.email.value, this.state.password.value)
			event.target.name === 'login' && this.props.loginRequest(this.state.email.value, this.state.password.value)
		}
		else {
			return
		}
	}

	render() {
		return (
			<form
				className={['form', this.props.className].join(' ').trim()}
				onSubmit={this.submitHandler}
			>
				<div className='form__header'>
					<h2 className='form__title'>Вход / Регистрация</h2>
					{this.props.isLoading && <Loader className='form__loader' />}
				</div>
				<Input
					className='form__input'
					name='email'
					type='email'
					value={this.state.email.value}
					id='form-email'
					required
					placeholder='example@gmail.com'
					label='Ваш email'
					errorMessage={this.state.email.errorMessage}
					disabled={this.props.isLoading}
					onChange={this.changeInputHandler}
				/>
				<Input
					className='form__input'
					name='password'
					type='password'
					value={this.state.password.value}
					id='form-password'
					isRequired
					placeholder='Не менее 6 символов'
					label='Ваш пароль'
					errorMessage={this.state.password.errorMessage}
					disabled={this.props.isLoading}
					onChange={this.changeInputHandler}
				/>
				<p className={['form__error', this.props.errorMessage ? 'form__error--show' : null].join(' ')}>{this.props.errorMessage ? this.props.errorMessage : 'Ошибка'}</p>
				<div className='form__button-list'>
					<Button
						className='form__button'
						name='login'
						isPrimary
						disabled={this.props.isLoading}
						type='submit'
						onClick={this.buttonClickHandler}
					>Войти</Button>
					<Button
						className='form__button'
						name='register'
						isSecondary
						disabled={this.props.isLoading}
						onClick={this.buttonClickHandler}
					>Зарегистрироваться</Button>
				</div>
				{
					this.props.isAuth &&
					<div className='form__message-block'>
						<p className='form__message'>
							<span>Вы вошли как:</span>
							<span className='form__email'>{this.props.userEmail}</span>
						</p>
						<div className='form__button-list'>
							<ButtonLink
								className='form__button'
								to='/tasks'
								isPrimary
							>Список задач</ButtonLink>
							<Button
								className='form__button'
								name='logout'
								isSecondary
								disabled={this.props.isLoading}
								onClick={this.props.logoutRequest}
							>Выйти</Button>
						</div>
					</div>
				}
			</form>
		)
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.isAuth,
		isLoading: state.auth.isLoading,
		userEmail: state.auth.userEmail,
		errorMessage: state.auth.errorMessage
	}
}

const mapDispatchToProps = {
	registerRequest,
	loginRequest,
	logoutRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
