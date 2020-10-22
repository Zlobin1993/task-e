import React from 'react'

const Attention = props => (
	<span className='attention'>
		{props.children}
		<span className="attention__background" />
	</span>
)

export default Attention