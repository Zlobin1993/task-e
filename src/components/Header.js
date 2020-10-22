import React from 'react'
import { connect } from 'react-redux'

import prettyClassName from '../helpers/prettyClassName'

import Logo from './Logo'
import Navigation from './Navigation'
import Loader from './Loader'

const Header = props => (
	<header className={prettyClassName(['header', props.className])}>
		<div className='container header__container'>
			<Logo />
			{
				props.isAuth &&
				<Navigation
					className='header__navigation'
					userName={props.userEmail}
				/>
			}
			{props.isLoading && <Loader />}
		</div>
	</header>
)

const mapStateToProps = state => ({
	isLoading: state.app.isLoading,
	isAuth: state.auth.isAuth,
	userEmail: state.auth.userEmail
})

export default connect(mapStateToProps)(Header)
