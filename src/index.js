import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import 'moment/locale/ru'

import { rootReducer } from './redux/rootReducer'

import './style/style.scss'

import App from './components/App'

const store = createStore(
	rootReducer,
	composeWithDevTools(
		applyMiddleware(thunk)
	)
)

const app = (
	<Provider store={store} >
		<App />
	</Provider>
)

ReactDOM.render(app, document.getElementById('root'))
