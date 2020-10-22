import React from 'react'

import prettyClassName from '../helpers/prettyClassName'

class Message extends React.Component {
	componentDidMount() {
		setTimeout(this.props.hideMessage, 5000)
	}

	render() {
		return (
			<li
				className={prettyClassName([
					'message__item',
					(this.props.type === 'success') && 'message__item--success',
					(this.props.type === 'error') && 'message__item--error'
				])}
				onClick={this.props.hideMessage}
			>{this.props.text}</li>
		)
	}
}

export default Message
