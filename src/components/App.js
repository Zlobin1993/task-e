import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { autoLogin } from '../redux/actions/authActions'

import Layout from './Layout'
import Login from '../pages/Login'
import TaskList from '../pages/TaskList'
import NotFound from '../pages/NotFound'

class App extends React.Component {
	componentDidMount = () => {
		this.props.autoLogin()
	}

	render() {
		return (
			<BrowserRouter>
				<Layout>
					<Switch>
						<Route exact path='/' component={Login} />
						<Route exact path='/tasks' component={TaskList} />
						<Route exact path='/404' component={NotFound} />
						<Redirect to='/404' />
					</Switch>
				</Layout>
			</BrowserRouter>
		)
	}
}

const mapDispatchToProps = {
	autoLogin
}

export default connect(null, mapDispatchToProps)(App)
