import React from 'react'
import { connect } from 'react-redux'

import { hideMessage } from '../redux/actions/appActions'

import prettyClassName from '../helpers/prettyClassName'

import Message from './Message'

class MessageList extends React.Component {
	render() {
		return (
			<aside className={prettyClassName(['message', this.props.className])}>
				<ul className='message__list'>
					{
						this.props.messageList.map((message) => (
							<Message
								key={message.id}
								type={message.type}
								text={message.text}
								hideMessage={() => this.props.hideMessage(message.id)}
							/>
						))
					}
				</ul>
			</aside>
		)
	}
}

const mapStateToProps = state => ({
	messageList: state.app.messageList
})

const mapDispatchToProps = {
	hideMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageList)
