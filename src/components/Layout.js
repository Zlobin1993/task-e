import React from 'react'

import Header from './Header'
import MessageList from './MessageList'
import Footer from './Footer'

const Layout = props => (
	<div className='layout'>
		<Header />
		<main className='main'>
			<MessageList />
			<div className='container main__container'>{props.children}</div>
		</main>
		<Footer />
	</div>
)

export default Layout
