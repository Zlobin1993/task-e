import React from 'react'

import prettyClassName from '../helpers/prettyClassName'

const Footer = props => (
	<div className={prettyClassName(['footer', props.className])}>
		<div className='container footer__container'>
			<p className='footer__text'>&laquo;Dangerous Evil&raquo; 2020</p>
		</div>
	</div>
)

export default Footer
